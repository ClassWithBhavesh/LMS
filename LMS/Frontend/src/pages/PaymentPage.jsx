import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";

import { getCourseById, createPaymentOrder, verifyPayment } from "../services/courseService";

export default function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const pageRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response = await getCourseById(courseId);

        if (response.success) {
          setCourse(response.course);
        } else {
          toast.error("Course not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Payment course fetch error:", error);

        toast.error("Unable to load course");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  useEffect(() => {
    if (!course) return;

    const ctx = gsap.context(() => {
      gsap.from(".payment-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".payment-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(".payment-right", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".payment-benefit", {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [course]);

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div>
          <div style={styles.loadingSpinner}></div>

          <p style={{ marginTop: "1rem", color: "#8b87a8" }}>
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  /*
    IMPORTANT:
    Never calculate the final payment amount only on the frontend.

    This calculation is only for displaying the UI.
    Razorpay order amount MUST come from the backend.
  */

  const subtotal = Number(course.price || 0);

  // Change this according to your actual GST/business configuration.
  const gst = Math.round(subtotal * 0.18);

  const total = subtotal + gst;

  const handlePayment = async () => {
    try {
      setProcessingPayment(true);

      /*
       * STEP 1
       * Ask backend to create Razorpay order.
       *
       * Backend must calculate the actual amount using courseId.
       */

      const orderResponse = await createPaymentOrder({
        courseId: course._id,
      });

      if (!orderResponse.success) {
        throw new Error(
          orderResponse.message || "Unable to create payment order"
        );
      }

      const order = orderResponse.order;

      /*
       * STEP 2
       * Make sure Razorpay SDK is available.
       */

      if (!window.Razorpay) {
        toast.error("Razorpay SDK is not loaded.");
        return;
      }

      /*
       * STEP 3
       * Open Razorpay Checkout.
       */

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency || "INR",

        name: "D'Code Gurukul",

        description: course.title,

        order_id: order.id,

        image: course.thumbnail,

        handler: async function (paymentResponse) {
          try {
            toast.info("Verifying payment...");

            /*
             * STEP 4
             * Verify payment on backend.
             */

            const verificationResponse = await verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,

              courseId: course._id,
            });

            if (verificationResponse.success) {
              toast.success("Payment successful! 🎉");

              /*
               * User is now enrolled.
               */

              navigate(`/lecture/${course._id}`);
            } else {
              toast.error(
                verificationResponse.message ||
                  "Payment verification failed"
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);

            toast.error(
              "Payment completed but verification failed. Please contact support."
            );
          } finally {
            setProcessingPayment(false);
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        notes: {
          courseId: course._id,
        },

        theme: {
          color: "#4f46e5",
        },

        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);

        toast.error(
          response.error?.description || "Payment failed. Please try again."
        );

        setProcessingPayment(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment"
      );

      setProcessingPayment(false);
    }
  };

  return (
    <div ref={pageRef} style={styles.page}>
      {/* Background glow */}

      <div style={styles.backgroundGlow}></div>

      {/* HEADER */}

      <header className="payment-header" style={styles.header}>
        <div style={styles.headerInner}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Back
          </button>

          <div style={styles.secureBadge}>
            🔒 Secure Checkout
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main style={styles.container}>
        <div className="payment-header" style={styles.titleSection}>
          <span style={styles.eyebrow}>
            COMPLETE YOUR ENROLLMENT
          </span>

          <h1 style={styles.title}>
            Invest in your{" "}
            <span style={styles.gradientText}>
              learning journey.
            </span>
          </h1>

          <p style={styles.subtitle}>
            You're one step away from getting lifetime access to
            this course.
          </p>
        </div>

        <div style={styles.checkoutGrid}>
          {/* LEFT */}

          <div className="payment-left">
            {/* COURSE CARD */}

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Course Details
                </h2>
              </div>

              <div style={styles.coursePreview}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={styles.courseImage}
                />

                <div style={styles.courseInfo}>
                  <div style={styles.levelBadge}>
                    {course.level} Level
                  </div>

                  <h3 style={styles.courseTitle}>
                    {course.title}
                  </h3>

                  <p style={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div style={styles.courseMeta}>
                    <span>
                      👨‍🎓 {course.students?.toLocaleString()}+
                      Students
                    </span>

                    <span>
                      ⭐ {course.rating}
                    </span>

                    <span>
                      ⏱ {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTRUCTOR */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                Your Course Instructor
              </h2>

              <div style={styles.instructor}>
                <div style={styles.instructorAvatar}>
                  {course.instructor?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h3 style={{ margin: 0 }}>
                    {course.instructor}
                  </h3>

                  <p style={styles.muted}>
                    Course Instructor
                  </p>
                </div>
              </div>
            </div>

            {/* BENEFITS */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                What's Included
              </h2>

              <div style={styles.benefitsGrid}>
                {[
                  "Lifetime course access",
                  "HD recorded lectures",
                  "Practical projects",
                  "Course completion certificate",
                  "Future course updates",
                  "Learning resources",
                ].map((benefit) => (
                  <div
                    className="payment-benefit"
                    key={benefit}
                    style={styles.benefit}
                  >
                    <div style={styles.checkIcon}>✓</div>

                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WHAT YOU WILL LEARN */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                What You'll Learn
              </h2>

              <div style={styles.learnList}>
                {course.benefits?.slice(0, 6).map((benefit, index) => (
                  <div
                    key={index}
                    style={styles.learnItem}
                  >
                    <span style={styles.learnNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <aside className="payment-right">
            <div style={styles.summaryCard}>
              <div style={styles.summaryTop}>
                <span style={styles.summaryLabel}>
                  ORDER SUMMARY
                </span>

                <span style={styles.lock}>
                  🔒
                </span>
              </div>

              {/* COURSE */}

              <div style={styles.summaryCourse}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={styles.summaryImage}
                />

                <div>
                  <h3 style={styles.summaryCourseTitle}>
                    {course.title}
                  </h3>

                  <p style={styles.summaryInstructor}>
                    By {course.instructor}
                  </p>
                </div>
              </div>

              <div style={styles.divider}></div>

              {/* BILL */}

              <div style={styles.bill}>
                <div style={styles.billRow}>
                  <span>Course Price</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div style={styles.billRow}>
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span>Total</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              {/* PAYMENT BUTTON */}

              <button
                onClick={handlePayment}
                disabled={processingPayment}
                style={{
                  ...styles.payButton,
                  opacity: processingPayment ? 0.7 : 1,
                  cursor: processingPayment
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {processingPayment
                  ? "Processing..."
                  : `Pay ₹${total.toLocaleString("en-IN")} →`}
              </button>

              {/* PAYMENT METHODS */}

              <div style={styles.paymentMethods}>
                <p style={styles.paymentMethodsTitle}>
                  SECURE PAYMENT OPTIONS
                </p>

                <div style={styles.paymentIcons}>
                  <div style={styles.paymentMethod}>
                    UPI
                  </div>

                  <div style={styles.paymentMethod}>
                    💳 Cards
                  </div>

                  <div style={styles.paymentMethod}>
                    🏦 Net Banking
                  </div>

                  <div style={styles.paymentMethod}>
                    Wallets
                  </div>

                  <div style={styles.paymentMethod}>
                    EMI
                  </div>
                </div>
              </div>

              {/* SECURITY */}

              <div style={styles.security}>
                <span>🔐</span>

                <div>
                  <strong>Secure Payment</strong>

                  <p>
                    Your payment is securely processed by
                    Razorpay.
                  </p>
                </div>
              </div>

              <p style={styles.terms}>
                By continuing, you agree to our Terms &
                Conditions and Refund Policy.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a12",
    color: "#f1f0ff",
    position: "relative",
    overflow: "hidden",
  },

  backgroundGlow: {
    position: "fixed",
    width: 600,
    height: 600,
    top: -300,
    left: -250,
    background:
      "radial-gradient(circle, rgba(79,70,229,0.16), transparent 70%)",
    pointerEvents: "none",
  },

  loadingScreen: {
    minHeight: "100vh",
    background: "#0a0a12",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  loadingSpinner: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTopColor: "#6366f1",
    animation: "spin 1s linear infinite",
    margin: "auto",
  },

  header: {
    padding: "1.5rem 2rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "relative",
    zIndex: 2,
  },

  headerInner: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#c4c1da",
    padding: "0.7rem 1rem",
    borderRadius: 10,
    cursor: "pointer",
  },

  secureBadge: {
    color: "#a5b4fc",
    fontSize: "0.85rem",
  },

  container: {
    maxWidth: 1300,
    margin: "0 auto",
    padding: "4rem 2rem 6rem",
    position: "relative",
    zIndex: 1,
  },

  titleSection: {
    marginBottom: "3rem",
  },

  eyebrow: {
    color: "#818cf8",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    fontWeight: 700,
  },

  title: {
    fontSize: "clamp(2.5rem,5vw,4rem)",
    lineHeight: 1.1,
    margin: "0.8rem 0",
    fontWeight: 900,
  },

  gradientText: {
    background:
      "linear-gradient(135deg,#818cf8,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    color: "#8b87a8",
    fontSize: "1rem",
    lineHeight: 1.7,
  },

  checkoutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 390px",
    gap: "2rem",
    alignItems: "start",
  },

  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "1.6rem",
    backdropFilter: "blur(20px)",
    marginBottom: "1.5rem",
  },

  cardHeader: {
    marginBottom: "1.5rem",
  },

  cardTitle: {
    margin: 0,
    fontSize: "1.35rem",
  },

  coursePreview: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "1.5rem",
  },

  courseImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 18,
  },

  courseInfo: {
    minWidth: 0,
  },

  levelBadge: {
    display: "inline-block",
    color: "#a5b4fc",
    background: "rgba(79,70,229,0.12)",
    border: "1px solid rgba(129,140,248,0.18)",
    padding: "0.35rem 0.7rem",
    borderRadius: 999,
    fontSize: "0.7rem",
    marginBottom: "0.7rem",
  },

  courseTitle: {
    margin: "0 0 0.5rem",
    fontSize: "1.35rem",
  },

  courseDescription: {
    color: "#8b87a8",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  courseMeta: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    color: "#aaa6c1",
    fontSize: "0.78rem",
    marginTop: "1rem",
  },

  instructor: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed)",
    fontSize: "1.2rem",
    fontWeight: 800,
  },

  muted: {
    color: "#8b87a8",
    fontSize: "0.8rem",
    marginTop: "0.3rem",
  },

  benefitsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  },

  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    color: "#c4c1da",
    fontSize: "0.9rem",
  },

  checkIcon: {
    width: 30,
    height: 30,
    minWidth: 30,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff",
    fontWeight: 800,
  },

  learnList: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },

  learnItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.05)",
    color: "#c4c1da",
    lineHeight: 1.5,
  },

  learnNumber: {
    color: "#818cf8",
    fontWeight: 800,
    fontSize: "0.8rem",
  },

  summaryCard: {
    position: "sticky",
    top: 30,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 26,
    padding: "1.5rem",
    backdropFilter: "blur(25px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  },

  summaryTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },

  summaryLabel: {
    color: "#818cf8",
    fontSize: "0.7rem",
    fontWeight: 800,
    letterSpacing: "0.12em",
  },

  lock: {
    fontSize: "0.9rem",
  },

  summaryCourse: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },

  summaryImage: {
    width: 70,
    height: 55,
    objectFit: "cover",
    borderRadius: 10,
  },

  summaryCourseTitle: {
    fontSize: "0.95rem",
    margin: 0,
    lineHeight: 1.4,
  },

  summaryInstructor: {
    color: "#8b87a8",
    fontSize: "0.75rem",
    margin: "0.3rem 0 0",
  },

  divider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    margin: "1.5rem 0",
  },

  bill: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  billRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#a9a5be",
    fontSize: "0.9rem",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
  },

  total: {
    fontSize: "1.5rem",
  },

  payButton: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "1.1rem",
    borderRadius: 14,
    border: "none",
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff",
    fontWeight: 800,
    fontSize: "1rem",
    boxShadow: "0 12px 30px rgba(79,70,229,0.25)",
  },

  paymentMethods: {
    marginTop: "1.5rem",
  },

  paymentMethodsTitle: {
    color: "#706c89",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    fontWeight: 700,
  },

  paymentIcons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },

  paymentMethod: {
    padding: "0.5rem 0.65rem",
    borderRadius: 8,
    background: "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,255,255,0.06)",
    color: "#aaa6c1",
    fontSize: "0.7rem",
  },

  security: {
    display: "flex",
    gap: "0.8rem",
    marginTop: "1.5rem",
    padding: "1rem",
    background: "rgba(34,197,94,0.05)",
    border:
      "1px solid rgba(34,197,94,0.1)",
    borderRadius: 12,
  },

  terms: {
    color: "#67637e",
    fontSize: "0.65rem",
    lineHeight: 1.6,
    textAlign: "center",
    marginTop: "1.2rem",
  },
};