import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
import loadRazorpay from "../utils/loadRazorpay";

import { toast } from "react-toastify";

import {
  getCourseDetails,
  createPaymentOrder,
  verifyPayment,
} from "../services/paymentService";

gsap.registerPlugin(ScrollTrigger);

export default function CheckoutPage() {
  const { courseId } = useParams();
  // console.log("courseId =", courseId);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [course, setCourse] = useState(null);
  // console.log("course =", course);

  const [loading, setLoading] = useState(true);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [gst, setGst] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (!course) return;

    const price = Number(course.price);

    const gstAmount = 0;

    setGst(gstAmount);

    setTotalAmount(price + gstAmount - discount);
  }, [course, discount]);

  useEffect(() => {
    if (!course) return;

    const ctx = gsap.context(() => {
      gsap.from(".checkout-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".checkout-left", {
        x: -80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
      });

      gsap.from(".checkout-right", {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power4.out",
      });

      gsap.utils.toArray(".checkout-reveal").forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [course]);

  const fetchCourse = async () => {
    try {
      // console.log("Course ID from URL:", courseId);

      const response = await getCourseDetails(courseId);

      // console.log("Response:", response);

      setCourse(response.course);
    } catch (error) {
      console.error("Fetch Course Error:", error);
      toast.error(error.response?.data?.message || "Unable to load course.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a12",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
        }}
      >
        Loading Checkout...
      </div>
    );
  }

  const cardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "1.6rem",
    backdropFilter: "blur(20px)",
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      // Load Razorpay SDK
      const sdkLoaded = await loadRazorpay();

      if (!sdkLoaded) {
        toast.error("Unable to load Razorpay.");
        return;
      }

      // Create Order
      const response = await createPaymentOrder(course._id);

      const options = {
        key: response.razorpayKey,

        amount: response.order.amount,

        currency: response.order.currency,

        name: "D'Code Gurukul",

        description: response.course.title,

        order_id: response.order.id,

        image: "/logo.png",

        theme: {
          color: "#4f46e5",
        },

        prefill: {
          name: "",

          email: "",

          contact: "",
        },

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await verifyPayment({
              courseId: course._id,

              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,
            });

            toast.success(verifyResponse.message);

            navigate(`/lecture/${course._id}`);
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Payment verification failed.",
            );
          }
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to initiate payment.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a12",
        color: "#f1f0ff",
      }}
    >
      {/* ---------------- HERO ---------------- */}

      <section
        ref={heroRef}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "7rem 2rem 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(79,70,229,.20), transparent 45%)",
          }}
        />

        <div
          style={{
            maxWidth: 1350,
            margin: "0 auto",
          }}
        />
        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            background: "transparent",
            color: "#b7b5ce",
            border: "none",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: ".95rem",
          }}
        >
          <ArrowLeft size={18} />
          Back to Course
        </button>

        {/* Heading */}

        <div className="checkout-title">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".6rem",
              padding: ".55rem 1rem",
              borderRadius: 999,
              background: "rgba(79,70,229,.12)",
              border: "1px solid rgba(129,140,248,.18)",
              color: "#a5b4fc",
              marginBottom: "1.3rem",
            }}
          >
            <Lock size={16} />
            Secure Checkout
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem,5vw,4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Complete Your Enrollment
          </h1>

          <p
            style={{
              maxWidth: 720,
              color: "#8b87a8",
              fontSize: "1.05rem",
              lineHeight: 1.8,
            }}
          >
            You're just one step away from getting lifetime access to this
            premium course.
          </p>
        </div>

        {/* Grid */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr .8fr",
            gap: "2.5rem",
            marginTop: "4rem",
          }}
        >
          {/* LEFT */}

          <div ref={leftRef} className="checkout-left">
            <div style={cardStyle}>
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{
                  width: "100%",
                  borderRadius: 22,
                  objectFit: "cover",
                  marginBottom: "1.8rem",
                }}
              />

              <div
                style={{
                  display: "inline-flex",
                  padding: ".45rem .9rem",
                  borderRadius: 999,
                  background: "rgba(79,70,229,.12)",
                  color: "#a5b4fc",
                  marginBottom: "1rem",
                }}
              >
                {course.level} Level
              </div>

              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  fontWeight: 800,
                }}
              >
                {course.title}
              </h2>

              <p
                style={{
                  color: "#8b87a8",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                {course.description}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  ["Instructor", course.instructor],

                  ["Duration", course.duration],

                  ["Students", course.students],

                  ["Rating", course.rating],
                ].map((item) => (
                  <div
                    key={item[0]}
                    style={{
                      padding: "1rem",
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: 18,
                    }}
                  >
                    <div
                      style={{
                        color: "#8b87a8",
                        fontSize: ".85rem",
                        marginBottom: ".4rem",
                      }}
                    >
                      {item[0]}
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {item[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            ref={rightRef}
            className="checkout-right"
            style={{
              position: "sticky",
              top: 120,
              height: "fit-content",
            }}
          >
            {/* ORDER SUMMARY */}

            <div style={cardStyle}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  marginBottom: "2rem",
                }}
              >
                Order Summary
              </h2>

              {/* Price */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  color: "#c8c6df",
                }}
              >
                <span>Course Price</span>

                <strong>₹{Number(course.price).toLocaleString()}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  color: "#c8c6df",
                }}
              >
                <span>GST</span>

                <strong>₹{gst}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  color: "#53d769",
                }}
              >
                <span>Discount</span>

                <strong>- ₹{discount}</strong>
              </div>

              <hr
                style={{
                  border: 0,
                  borderTop: "1px solid rgba(255,255,255,.08)",
                  marginBottom: "1.5rem",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                  }}
                >
                  Total
                </span>

                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              {/* Coupon */}

              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: ".8rem",
                    color: "#b9b6d3",
                    fontWeight: 600,
                  }}
                >
                  Have a Coupon?
                </label>

                <div
                  style={{
                    display: "flex",
                    gap: ".8rem",
                  }}
                >
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon Code"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.08)",
                      outline: "none",
                      color: "#fff",
                      padding: ".95rem 1rem",
                      borderRadius: 14,
                    }}
                  />

                  <button
                    style={{
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 14,
                      padding: "0 1.2rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                      color: "#fff",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Security */}

              <div
                style={{
                  padding: "1rem",
                  borderRadius: 18,
                  background: "rgba(79,70,229,.08)",
                  border: "1px solid rgba(129,140,248,.15)",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".8rem",
                    marginBottom: ".9rem",
                  }}
                >
                  <ShieldCheck color="#53d769" size={22} />

                  <strong>Secure Checkout</strong>
                </div>

                <p
                  style={{
                    color: "#9d99ba",
                    lineHeight: 1.8,
                    fontSize: ".95rem",
                  }}
                >
                  Your payment is protected using industry-standard 256-bit SSL
                  encryption and processed securely by Razorpay.
                </p>
              </div>

              {/* Included */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  "Lifetime Course Access",
                  "HD Video Lectures",
                  "Downloadable Resources",
                  "Projects & Assignments",
                  "Certificate of Completion",
                  "Future Course Updates",
                ].map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".8rem",
                      color: "#d4d2e8",
                    }}
                  >
                    <BadgeCheck size={18} color="#53d769" />

                    {feature}
                  </div>
                ))}
              </div>

              {/* Pay Button */}

              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                style={{
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  padding: "1rem",
                  borderRadius: 16,
                  fontWeight: 800,
                  fontSize: "1rem",
                  background: paymentLoading
                    ? "#444"
                    : "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  color: "#fff",
                }}
              >
                {paymentLoading
                  ? "Creating Order..."
                  : `Pay ₹${totalAmount.toLocaleString()} Securely`}
              </button>

              <div
                style={{
                  marginTop: "1.3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".6rem",
                  color: "#8f8aa9",
                  fontSize: ".9rem",
                }}
              >
                <CreditCard size={18} />
                Powered by Razorpay
              </div>
            </div>

            {/* TRUST CARD */}

            <div
              className="checkout-reveal"
              style={{
                ...cardStyle,
                marginTop: "1.8rem",
              }}
            >
              <h3
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                Why Learn With Us?
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  "Industry-ready curriculum",
                  "Real-world projects",
                  "Placement assistance",
                  "Expert mentorship",
                  "Interview preparation",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".8rem",
                    }}
                  >
                    <BadgeCheck color="#53d769" size={18} />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="checkout-reveal"
        style={{
          padding: "0 2rem 5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1350,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              title: "100% Secure Payment",
              text: "Encrypted payment gateway powered by Razorpay.",
            },
            {
              title: "Instant Access",
              text: "Start learning immediately after successful payment.",
            },
            {
              title: "Lifetime Access",
              text: "One payment gives you unlimited access forever.",
            },
            {
              title: "Expert Support",
              text: "Dedicated mentor support whenever you need help.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                ...cardStyle,
                textAlign: "center",
              }}
            >
              <ShieldCheck
                size={38}
                color="#53d769"
                style={{
                  marginBottom: "1rem",
                }}
              />

              <h3
                style={{
                  marginBottom: ".8rem",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#9d99ba",
                  lineHeight: 1.8,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
