import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpForm from "../../SignupForm/SignUpForm";

const Signup = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default Signup;
