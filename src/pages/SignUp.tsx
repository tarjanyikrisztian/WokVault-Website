import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../styles/signup.module.scss'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, User } from "firebase/auth";
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const [regFormData, setRegFormData] = useState({
        emailReg: '',
        password: '',
        confirmPassword: ''
    });

    const [forgotFormData, setForgotFormData] = useState('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email: string) => {
        return emailRegex.test(email);
    }

    const validatePassword = (password: string) => {
        return passwordRegex.test(password);
    }

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    useEffect(() => {
        if (!isForgotPassword) {
            document.title = 'WokVault | Sign Up';
            const emailRegWrap = document.getElementById('emailRegWrap') as HTMLInputElement;
            const passwordWrap = document.getElementById('passwordWrap') as HTMLInputElement;
            const confirmPasswordWrap = document.getElementById('confirmPasswordWrap') as HTMLInputElement;

            if (!validateEmail(regFormData.emailReg) && regFormData.emailReg !== '') {
                emailRegWrap.setAttribute('aria-invalid', 'true');
            } else {
                emailRegWrap.setAttribute('aria-invalid', 'false');
            }

            if (!validatePassword(regFormData.password) && regFormData.password !== '') {
                const passwordError = document.getElementById('passwordError') as HTMLInputElement;
                passwordWrap.setAttribute('aria-invalid', 'true');
                let errors = {
                    specialCharacter: {
                        text: 'The password must contain a special character',
                        valid: /[^\da-zA-Z]/.test(regFormData.password)
                    },
                    number: {
                        text: 'The password must contain a number',
                        valid: /\d/.test(regFormData.password)
                    },
                    lowercase: {
                        text: 'The password must contain a lowercase letter',
                        valid: /[a-z]/.test(regFormData.password)
                    },
                    uppercase: {
                        text: 'The password must contain an uppercase letter',
                        valid: /[A-Z]/.test(regFormData.password)
                    },
                    length: {
                        text: 'The password must be at least 12 characters long',
                        valid: regFormData.password.length >= 12 ? true : false
                    }
                };
                let errorText = '';
                for (const error in errors) {
                    if (!errors[error as keyof typeof errors].valid) {
                        errorText = errors[error as keyof typeof errors].text;
                    }
                }
                passwordError.innerText = errorText;
            } else {
                passwordWrap.setAttribute('aria-invalid', 'false');
            }

            if (!validateConfirmPassword(regFormData.password, regFormData.confirmPassword) && regFormData.confirmPassword !== '') {
                confirmPasswordWrap.setAttribute('aria-invalid', 'true');
            } else {
                confirmPasswordWrap.setAttribute('aria-invalid', 'false');
            }

            if (validateEmail(regFormData.emailReg) && validatePassword(regFormData.password) && validateConfirmPassword(regFormData.password, regFormData.confirmPassword)) {
                (document.getElementById('submit_reg') as HTMLInputElement).disabled = false;
            } else {
                (document.getElementById('submit_reg') as HTMLInputElement).disabled = true;
            }
        } else {
            document.title = 'WokVault | Forgot Password';
            const emailForgotWrap = document.getElementById('emailForgotWrap') as HTMLInputElement;

            if (!validateEmail(forgotFormData) && forgotFormData !== '') {
                emailForgotWrap.setAttribute('aria-invalid', 'true');
            } else {
                emailForgotWrap.setAttribute('aria-invalid', 'false');
            }

            if (validateEmail(forgotFormData)) {
                (document.getElementById('submit_forgot') as HTMLInputElement).disabled = false;
            } else {
                (document.getElementById('submit_forgot') as HTMLInputElement).disabled = true;
            }
        }

    }, [regFormData, forgotFormData, isForgotPassword]);






    const onChangeReg = (e: any) => {
        setRegFormData({ ...regFormData, [e.target.name]: e.target.value });
    };

    const onChangeForgot = (e: any) => {
        setForgotFormData(e.target.value);
    };

    const register = async (e: any) => {
        e.preventDefault();
        if (regFormData.password !== regFormData.confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            await createUserWithEmailAndPassword(auth, regFormData.emailReg, regFormData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    sendEmailVerification(user)
                        .then(() => {
                            toast.success("Confirmation email has been sent to your email address!");
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            toast.error(errorMessage + ", Error Code: " + errorCode);
                        });
                    setRegFormData({
                        emailReg: '',
                        password: '',
                        confirmPassword: ''
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage + ", Error Code: " + errorCode);
                });
        }
    }

    const forgotPassword = async (e: any) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, forgotFormData)
            .then(() => {
                toast.success("Email has been sent to your email address!");
                setForgotFormData('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage + ", Error Code: " + errorCode);
            });
    }




    return (
        <div className={styles.main}>
            <div className={styles.wrap}>
                <h1 className={styles.title}>Welcome to <br /><span>WokVault</span></h1>
                {
                    isForgotPassword ? (
                        <p className={styles.description}>Forgot your password? No worries, we got you.</p>
                        ) : (
                            <p className={styles.description}>Let's start your journey with protecting your passwords.</p>
                            )
                        }
                        <p className={styles.secondTitle}>Having an account is not required to use WokVault, it is only for syncing across devices.</p>
                <div className={styles.switchButtonWrap}>
                    {isForgotPassword ? (
                        <>
                            <div className={styles.switchButtonBg} aria-checked="false"></div>
                            <button className={styles.switchButton} onClick={() => setIsForgotPassword(false)} aria-current="false">Sign up</button>
                            <button className={styles.switchButton} onClick={() => setIsForgotPassword(true)} aria-current="true">Forgot password</button>
                        </>
                    ) : (
                        <>
                            <div className={styles.switchButtonBg} aria-checked="true"></div>
                            <button className={styles.switchButton} onClick={() => setIsForgotPassword(false)} aria-current="true">Sign up</button>
                            <button className={styles.switchButton} onClick={() => setIsForgotPassword(true)} aria-current="false">Forgot password</button>
                        </>
                    )}
                </div>
                {isForgotPassword ? (
                    <form className={styles.form} id='forgotpassword'>
                        <div className={styles.input_wrap} aria-invalid="false" id='emailForgotWrap'>
                            <p className={styles.invalid_input} id='emailForgotError'>Invalid email address</p>
                            <input className={styles.input} type="email" placeholder="Email" name='email_forgot' id='email_forgot' required onChange={e => onChangeForgot(e)} value={forgotFormData} />
                            <label className={styles.label} htmlFor="email_forgot">Email</label>
                        </div>
                        <button className={styles.button} type='submit' id='submit_forgot' onClick={forgotPassword}>Send Email</button>
                    </form>

                ) : (
                    <form className={styles.form} id='emailSignup'>
                        <div className={styles.input_wrap} aria-invalid="false" id='emailRegWrap'>
                            <p className={styles.invalid_input} id='emailRegError'>Invalid email address</p>
                            <input className={styles.input} type="email" placeholder="Email" name='emailReg' id='emailReg' required onChange={e => onChangeReg(e)} value={regFormData.emailReg} />
                            <label className={styles.label} htmlFor="emailReg">Email</label>
                        </div>
                        <div className={styles.input_wrap} aria-invalid="false" id='passwordWrap'>
                            {showPassword ?
                                <svg className={styles.passwordEye} onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>
                                :
                                <svg className={styles.passwordEye} onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                            }
                            <p className={styles.invalid_input} id='passwordError'></p>
                            <input className={styles.input} type={showPassword ? "text" : "password"} placeholder="Password" name='password' id='password' required onChange={e => onChangeReg(e)} value={regFormData.password} />
                            <label className={styles.label} htmlFor="password">Password</label>
                        </div>
                        <div className={styles.input_wrap} aria-invalid="false" id='confirmPasswordWrap'>
                            {showPassword ?
                                <svg className={styles.passwordEye} onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>
                                :
                                <svg className={styles.passwordEye} onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                            }
                            <p className={styles.invalid_input} id='confirmPasswordError'>The passwords must match</p>
                            <input className={styles.input} type={showPassword ? "text" : "password"} placeholder="Confirm Password" name='confirmPassword' id='confirmPassword' required onChange={e => onChangeReg(e)} value={regFormData.confirmPassword} />
                            <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <button className={styles.button} type='submit' id='submit_reg' onClick={register}>Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default SignUp