import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const [paymentLoad, setPaymentLoad] = useState(false)
  const [planSelected , setPlanSelected] = useState(null);
  const navigate = useNavigate();

  const {addTokens} = useAuthStore();
  const pricingPlans = {
    standard: {
      name: "standard",
      tokens: 10,
      priceInRupees: 99.0,
      description: "Perfect for trying out AI analysis",
    },
    premium: {
      name: "premium",
      tokens: 25,
      priceInRupees: 199.0,
      description: "Great for regular coding practice",
      popular: true,
    },
    pro: {
      name: "pro",
      tokens: 50,
      priceInRupees: 349.0,
      description: "Best value for serious developers",
    }
  };

  const handlePlanSelect = async (planName) => {
    try {

      setPaymentLoad(true);

      setPlanSelected(planName);

      
      const { data } = await axiosInstance.post("/payment/create-order", { planName });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from env
        amount: data.amount * 100,
        currency: "INR",
        name: "Token Purchase",
        description: `${planName} pack`,
        order_id: data.orderId,
        handler: async function (response) {
          try {
             
            
              await axiosInstance.post("/payment/verify-payment", {
                razorpay_payment_id: response.razorpay_payment_id,
                tokens: data.tokens,
                amount: data.amount,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              });

              setPaymentLoad(false)
              addTokens(data.tokens);
              navigate("/");
              toast.success("Tokens added successfully!");
            
          } catch (error) {
            console.error(error)
            toast.error("Error in verifying payment");
            
            
          }finally{
            setPaymentLoad(false)
            setPlanSelected(null)
            
          }
        }
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

      setPaymentLoad(false)
      setPlanSelected(null)
      
    } catch (error) {
      console.log(error);
      setPaymentLoad(false)
      setPlanSelected(null)
    }finally{
       navigate("/");
    }
    
  };

  const getButtonText = (planName) => {
    if (paymentLoad && planSelected === planName) {
      return "Processing..."
    }
    return "Get Started Now"
  }

  const isButtonLoading = (planName) => {
    return paymentLoad && planSelected === planName
  }

  return (
    <div>
       <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-[#4FD1C5] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-[#F97316] opacity-20 blur-3xl z-[-1] rounded-md"></div>
      <div className="min-h-screen   relative overflow-hidden">
      {/* Gradient Blobs */}
     
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white  mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-[#4FD1C5]  to-[#F97316] bg-clip-text text-transparent ml-4">
              AI Power
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of AI-driven code analysis with our flexible token packages. 
            Start small or go big - we have the perfect plan for every developer.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {Object.entries(pricingPlans).map(([key, plan]) => (
            <div
              key={key}
              className={`relative bg-gray-800 rounded-3xl shadow-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-[#F97316] ring-4 ring-[#F97316]/20' 
                  : 'border-gray-700 hover:border-[#4FD1C5]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#EA630F]  text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name.charAt(0).toUpperCase()+plan.name.slice(1)}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">
                      ₹{plan.priceInRupees.toFixed(0)}
                    </span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>

                  {/* Tokens */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    plan.popular 
                      ? 'bg-[#EA630F] text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}>
                    <span className="font-semibold">
                      {plan.tokens} AI Tokens
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      plan.popular ? 'bg-[#F97316]' : 'bg-[#4FD1C5]'
                    }`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Advanced AI Code Analysis</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      plan.popular ? 'bg-[#F97316]' : 'bg-[#4FD1C5]'
                    }`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Performance Optimization Tips</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      plan.popular ? 'bg-[#F97316]' : 'bg-[#4FD1C5]'
                    }`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">24/7 Platform Access</span>
                  </div>
                  
                  {plan.tokens >= 25 && (
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        plan.popular ? 'bg-[#F97316]' : 'bg-[#4FD1C5]'
                      }`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Priority Processing</span>
                    </div>
                  )}
                  
                  {plan.tokens >= 50 && (
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        plan.popular ? 'bg-[#F97316]' : 'bg-[#4FD1C5]'
                      }`}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Advanced Analytics Dashboard</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.name)}
                   disabled={isButtonLoading(plan.name)}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#EA630F] text-white hover:bg-[#DC580D] shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-[#EA630F] shadow-lg hover:shadow-xl'
                  } transform hover:scale-105`}
                >
                  {getButtonText(plan.name)}

                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
    </div>
  );
};

export default PricingPage;