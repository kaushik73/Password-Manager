import { useState, useEffect, useRef, useMemo } from "react";
import { togglePassword } from "../utils/utlis";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { isUserExist, signUpUser } from "../utils/dbOperations";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const navigate = useNavigate();
  const passwordImgRef = useRef(null);
  const passwordRef = useRef();
  const confirmPasswordImgRef = useRef(null);
  const confirmPasswordRef = useRef();
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    ownerEmail: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [securityAnswerPlaceholder, setSecurityAnswerPlaceholder] =
    useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");

  const securityQuestions = useMemo(
    () => [
      "What is your pet's name?",
      "What city were you born in?",
      "What is your favorite color?",
    ],
    []
  );

  const securityAnswerPlaceholders = useMemo(
    () => [
      "Enter your pet's name",
      "Enter your city",
      "Enter your favorite color",
    ],
    []
  );

  const handleSignUpClick = async () => {
    const doesUserExist = await isUserExist(signUpForm);
    if (doesUserExist == true) {
      toast.error("You are Already Registered");
    } else {
      if (signUpForm.password != signUpForm.confirmPassword) {
        toast.warning("Password Mismatch ");
      } else {
        await signUpUser(signUpForm);
        toast.success("Sign Up Success");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const index = securityQuestions.indexOf(securityQuestion);
    if (index !== -1) {
      setSecurityAnswerPlaceholder(securityAnswerPlaceholders[index]);
    }
  }, [securityQuestions, securityAnswerPlaceholders, securityQuestion]);

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSecurityQuestionChange = (e) => {
    const selectedQuestion = e.target.value;
    setSecurityQuestion(selectedQuestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUpClick();
  };

  const handleTogglePassword = (passwordRef, imgRef) => {
    togglePassword(passwordRef, imgRef);
  };
  return (
    <>
      <ToastContainer toastType="success" />

      <div className="content flex items-center justify-center">
        <div className=" signUpForm  max-w-4xl mx-auto rounded-lg shadow-md sm:w-2/6 w-5/6">
          <div className="signUpHeadingAndCross   p-3 rounded-t-lg bg-gray-100 flex justify-between items-center">
            <div className="signUpHeading text-3xl font-bold flex-grow text-black ml-3">
              SignUp :
            </div>
            <div className="crossIcon cursor-pointer pt-1">
              <lord-icon
                src="https://cdn.lordicon.com/zxvuvcnc.json"
                onClick={() => navigate("/")}
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
                title="Go To Home "
              ></lord-icon>
            </div>
          </div>
          <div className="signUpFormContent flex justify-center items-center ">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 px-6 py-3 rounded-b-lg shadow-md w-full"
            >
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={signUpForm.name}
                  onChange={handleChange}
                  required
                  className="inputTag signUpInputTag"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email ID</label>
                <input
                  type="ownerEmail"
                  name="ownerEmail"
                  value={signUpForm.ownerEmail}
                  onChange={handleChange}
                  className="inputTag signUpInputTag"
                  placeholder="Enter Email ID"
                  required
                />
              </div>

              <div className="mb-4 relative flex-grow">
                <label className="block mb-1">Password</label>
                <input
                  name="password"
                  ref={passwordRef}
                  value={signUpForm.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
                  className="inputTag signUpInputTag"
                  type="password"
                />
                <img
                  ref={passwordImgRef}
                  src="/icons/OpenEye.png"
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                  onClick={() =>
                    handleTogglePassword(
                      handleTogglePassword(passwordRef, passwordImgRef)
                    )
                  }
                />
              </div>

              <div className="mb-4 relative flex-grow">
                <label className="block mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  ref={confirmPasswordRef}
                  value={signUpForm.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter Confirm Password"
                  className="inputTag signUpInputTag"
                  type="password"
                />
                <img
                  ref={confirmPasswordImgRef}
                  src="/icons/OpenEye.png"
                  alt="Toggle Password Visibility"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                  onClick={() =>
                    handleTogglePassword(
                      confirmPasswordRef,
                      confirmPasswordImgRef
                    )
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Security Question</label>
                <select
                  value={signUpForm.securityQuestion}
                  name="securityQuestion"
                  onChange={(e) => {
                    handleChange(e);
                    handleSecurityQuestionChange(e);
                  }}
                  className="inputTag signUpInputTag"
                >
                  <option value="">Select a security question</option>
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                {signUpForm.securityQuestion ? (
                  <input
                    type="securityAnswer"
                    name="securityAnswer"
                    placeholder={securityAnswerPlaceholder}
                    value={signUpForm.securityAnswer}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputTag signUpInputTag"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="signUpSubmitButton flex justify-center items-center ">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
