import axios from "axios";
import VerificationInput from "react-verification-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function VerificationCode() {
  const navigate = useNavigate();

  function verifyResetCode(value) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: value,
      })
      .then(() => {
        toast.success(`Verification Code is Successed`);
        navigate(`/resetpassword`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
    <>
     <Helmet>
   <title>Verification Code</title>
     </Helmet>
      <section className="text-center pt-24">
        <div className=" w-full py-10">
          <h2 className="text-2xl font-bold text-green-600 ">
            Verification Code
          </h2>
          <p className="text-slate-600 py-5">
            Enter the code that sent to your Email
          </p>
          <VerificationInput
            classNames={{
              container: "container-input",
              character: "character",
            }}
            length={6}
            validChars="0-9"
            placeholder=""
            autoFocus
            onComplete={verifyResetCode}
          />
        </div>
      </section>
    </>
  );
}
