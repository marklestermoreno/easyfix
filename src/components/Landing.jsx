import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


import BannerImage from '../assets/banner.jpg'
import logo from '../assets/logo.png'
import validator from 'validator';

// Semantic UI
import { ToastContainer, toast } from 'react-toastify';
import { Card, Image, Icon, Button, Header, Modal, Checkbox, Form, ModalActions } from 'semantic-ui-react'

const Landing = () => {

    const userid = "userid-" + uuidv4().slice(0, 10);

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const [open, setOpen] = useState(false)

    const openLogin = () => {
        setOpen(true)
    }

    const [reset, setReset] = useState(false)

    const openReset = () => {
        setReset(true)
    }

    const [signup, setSignup] = useState(false)

    const openSignup = () => {
        setSignup(true)
    }

    const [, setIsDisabled] = useState(true);
    const [checked, setChecked] = useState(false);

    const dataSubmit = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };

    const onCheckboxClick = () => {
        setChecked(!checked);
        return dataSubmit();
    };

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                users.map((user) => {
                    // if (user.emailVerified === true) {
                    if (user.type === "user") {
                        navigate("/dashboard-user")
                    }
                    else {
                        navigate("/dashboard-merchant")
                    }

                    // else {
                    //     navigate("/not-verified")
                    // }
                })

                console.log(user);
                setLoading(false)
                toast.success(<p> <b> Login Successfully </b>
                    <br /> You will be redirected to dashboard </p>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(() => {
                setLoading(false)
                toast.error(
                    <p> <b> Login Failed</b>
                        <br />If you typed correctly, make sure that you verify your email in your spam </p>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });

    }

    // const googleProvider = new GoogleAuthProvider();
    // const signInWithGoogle = async () => {
    //     setLoading2(true)
    //     try {
    //         const res = await signInWithPopup(auth, googleProvider);
    //         // res.user.displayName
    //         // res.user.emailVerified
    //         // res.user.email
    //         // res.user.photoURL

    //         const user = res.user;
    //         setLoading2(false)

    //         if (user) {
    //             navigate("/dashboard")
    //         }
    //         window.alert(res.user.displayName)
    //         // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //         // const docs = await getDocs(q);
    //         // if (docs.docs.length === 0) {
    //         //     await addDoc(collection(db, "users"), {
    //         //         uid: user.uid,
    //         //         name: user.displayName,
    //         //         authProvider: "google",
    //         //         email: user.email,
    //         //     });
    //         // }
    //     } catch (err) {
    //         setLoading(false)
    //         toast.error(
    //             <p> <b> Something went wrong! </b>
    //                 <br /> {err} </p>, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     }
    // };

    // Forgot Password 

    const [resetPass, setResetPass] = useState("")

    const forgotPassword = async () => {
        setLoading(true)
        sendPasswordResetEmail(auth, resetPass)
            .then(() => {
                setLoading(false)
                toast.success(<p> <b> Password Reset Sent </b>
                    <br /> Open Spam to see the link </p>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

            .catch((error) => {
                setLoading(false)
                toast.error(
                    <p> <b> Something went wrong! </b>
                        <br /> {error} </p>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

    }


    // Signup

    const [emailReg, setEmailReg] = useState('')
    const [name, setName] = useState("")
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onSubmitMerchant = async () => {
        setLoading(true)

        try {
            await createUserWithEmailAndPassword(auth, emailReg, passwordReg)
                .then((userCredential) => {
                    setLoading(false)
                    setSignup(false)
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/")
                    toast.success(<p> <b> Merchant Registered</b>
                        <br /> Please verify your link in your spam mail before you login </p>, {
                        position: "top-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    const userCollection = collection(db, "user")
                    addDoc(userCollection, {
                        dateCreated: serverTimestamp(),
                        email: emailReg,
                        emailVerified: user.emailVerified,
                        id: userid,
                        name: name,
                        type: "merchant"
                    })
                })
                .catch((error) => {
                    setLoading(false)
                    setSignup(false)
                    toast.error(<p> <b> Register Failed </b>
                        <br /> {error} </p>, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })

        }
        catch (err) {
            setLoading(false)
            setSignup(false)
            toast.error(<p> <b> Register Failed </b>
                <br /> {err} </p>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const onSubmitUser = async () => {
        setLoading2(true)
        await createUserWithEmailAndPassword(auth, emailReg, passwordReg)
            .then((userCredential) => {
                setLoading2(false)
                setSignup(false)
                const user = userCredential.user;
                console.log(user);
                setSignup(false)
                toast.success(<p> <b> User Registered</b>
                    <br /> Please verify your link in your spam mail before you login </p>, {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const userCollection = collection(db, "user")
                addDoc(userCollection, {
                    dateCreated: serverTimestamp(),
                    email: emailReg,
                    emailVerified: user.emailVerified,
                    id: userid,
                    name: name,
                    type: "user"
                })
                window.location.reload()
            })
            .catch((error) => {
                setLoading2(false)
                setSignup(false)
                toast.error(<p> <b> Register Failed </b>
                    <br /> {error} </p>, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            });
    }

    // Password Validator

    const [errorMessage, setErrorMessage] = useState('')

    const validate = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage("good")
        } else {
            setErrorMessage("error")
        }
    }

    // Email Validator

    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
        setEmailReg(event.target.value);
    };


    const [users, setUsers] = useState([])

    const userCollection = collection(db, "user");

    useEffect(() => {
        onSnapshot(userCollection, snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }

                //query 

            }))
        })

    }, [])


    return (
        <>
            <main>
                <header className='p-5 mx-5'>
                    <div className='flex justify-between'>
                        <Link to="/">
                            <img src={logo} alt="logo" className='w-40 hover:brightness-110' />
                        </Link>
                        <div className='flex items-center'>
                            <span onClick={openLogin} className='mr-5 text-primary duration-200 hover:cursor-pointer text-lg hover:text-secondary'> Login </span>
                            <span onClick={openSignup} className='ml-5 text-primary duration-200 hover:cursor-pointer text-lg hover:text-secondary'> Signup </span>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="xsm:p-10 relative flex justify-between items-center font-Poppins opacity-90"
                        style={{
                            backgroundImage: `url(${BannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '500px'
                        }}>
                    </div>

                    <div className='m-10 flex justify-around'>
                        <Card.Group doubling="true" stackable="true" className='flex justify-center'>
                            <div className='mx-10 my-5'>
                                <Card>
                                    <Card.Content header={"Hello World!"} textAlign="center" />
                                    <Card.Content
                                        style={{
                                            height: "200px",
                                            backgroundImage: `url(https://cdn.pixabay.com/photo/2017/05/13/15/18/dear-2309801_1280.jpg)`,
                                            backgroundSize: "cover",
                                        }}
                                    >
                                        <Card.Description style={{ color: "white" }}>
                                            Hello World!
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name="money bill alternate outline" />
                                        Money Icon
                                        <Button color="green" inverted floated="right">
                                            Submit
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </div>

                        </Card.Group>
                    </div>
                </section>

                <footer className='bg-secondary'>
                    {/* <div>
                        <h1 className='text-white m-10'> Footer</h1>
                    </div> */}
                </footer>
            </main>

            { /* Modal Login */}
            <Modal
                open={open}
                size="tiny"
                onClose={() => { setOpen(false); setChecked(false) }}

            >
                <Header content='EasyFix Login' />
                <Modal.Content>
                    <Form className='flex justify-center flex-col'>

                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email Address'
                                id="email-address"
                                name="email"
                                type="email"
                                disabled={loading}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <div className='flex justify-between mb-1'>
                                <label className='font-semibold'>Password</label>
                                <span className='ml-2 text-secondary hover:cursor-pointer font-medium' onClick={openReset}> Forgot Password? </span>
                            </div>
                            <input placeholder='Password' type="password"
                                id="password"
                                name="password"
                                disabled={loading}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Field>

                        <div className='ml-2 mt-3 mb-2'>
                            <Form.Field>
                                <Checkbox label='Agree to the Terms and Conditions' onClick={onCheckboxClick} />
                            </Form.Field>
                        </div>
                        <div className='my-5 w-full text-center flex justify-center items-center'>
                            <div className='mx-2 w-full'>
                                <Button color='blue' onClick={onLogin} disabled={!checked} loading={loading}>
                                    <Icon name='user' /> Login with Email/Password
                                </Button>
                            </div>
                            {/* <div className='mx-2'>
                                <Button color='red' onClick={signInWithGoogle} disabled={!checked} loading={loading2}>
                                    <Icon name='google' /> Login with Google
                                </Button>
                            </div> */}
                        </div>

                    </Form>
                </Modal.Content>
                <Modal
                    open={reset}
                    size="tiny"
                    onClose={() => setReset(false)}

                >
                    <Header content='EasyFix Reset' />
                    <Modal.Content>
                        <Form className='flex justify-center flex-col'>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder='Email' disabled={loading} onChange={(e) => { setResetPass(e.target.value) }} />
                            </Form.Field>

                            <div className='my-5 w-full text-center flex justify-center items-center'>
                                <div className='mx-2'>
                                    <Button color='blue' onClick={forgotPassword} disabled={!resetPass} loading={loading}>
                                        <Icon name='envelope' /> Send Email Verification
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    </Modal.Content>
                    <ModalActions>
                        <Button color='red' onClick={() => setReset(false)}>
                            <Icon name='close' /> Close
                        </Button>
                    </ModalActions>
                </Modal>

            </Modal>


            { /* Modal Signup */}
            <Modal
                open={signup}
                size="tiny"
                onClose={() => { setSignup(false); setChecked(false); setPasswordReg(""); setPasswordConfirm(""); setEmailReg("") }}

            >
                <Header content='EasyFix Register' />
                <Modal.Content>
                    <Form className='flex justify-center flex-col'>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Full Name'
                                id="name"
                                name="name"
                                disabled={loading}
                                required
                                className='capitalize'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className={name.length < 6 && name.length !== 0 ?
                                'text-red-500 text-center flex justify-center pt-2 font-semibold' :
                                'text-green-500 text-center flex justify-center pt-2 font-semibold'
                            }>
                                {
                                    name.length < 6 && name.length !== 0 ? "NAME SHOULD BE ATLEAST 6 CHARACTERS" : ""

                                }
                            </span>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email Address'
                                id="email-address"
                                name="email"
                                value={emailReg}
                                type="email"
                                className='border-none'
                                disabled={loading}
                                required
                                onChange={(e) => { handleChange(e) }}
                            />
                            <span className={error !== null && emailReg.length !== 0 ?
                                'text-red-500 text-center flex justify-center pt-2 font-semibold' :
                                'text-green-500 text-center flex justify-center pt-2 font-semibold'
                            }>
                                {
                                    error !== null && emailReg.length !== 0 ? "INVALID EMAIL ADDRESS" :
                                        emailReg.length === 0 ? "" : "VALID EMAIL ADDRESS"

                                }
                            </span>
                        </Form.Field>
                        <Form.Field>
                            <div className='flex justify-between mb-1'>
                                <label className='font-semibold'>Password</label>
                            </div>
                            <input placeholder='Password' type="password"
                                id="password"
                                name="password"
                                disabled={loading}
                                required
                                onChange={(e) => {
                                    validate(e.target.value)
                                    setPasswordReg(e.target.value)
                                }
                                }
                            />
                            <span
                                className={errorMessage !== "good" && passwordReg.length !== 0 ?
                                    'text-red-500 text-center flex justify-center pt-2 font-semibold' :
                                    'text-green-500 text-center flex justify-center pt-2 font-semibold'
                                }>
                                {
                                    errorMessage !== "good" && passwordReg.length !== 0 ?
                                        "PASSWORD NOT STRONG (8 MINIMUM CHARACTERS - CONTAINS ATLEAST ONE SYMBOL, ONE UPPERCASE AND ONE NUMBER)" :
                                        passwordReg.length === 0 ? "" : "GOOD PASSWORD COMBINATION"

                                }
                            </span>
                        </Form.Field>
                        <Form.Field>
                            <div className='flex justify-between mb-1'>
                                <label className='font-semibold'>Confirm Password</label>
                            </div>
                            <input placeholder='Password' type="password"
                                id="password"
                                name="password"
                                disabled={loading}
                                required
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                            <span
                                className={passwordConfirm !== passwordReg ?
                                    'text-red-500 text-center flex justify-center pt-2 font-semibold' :
                                    'text-green-500 text-center flex justify-center pt-2 font-semibold'
                                }>
                                {
                                    passwordConfirm !== passwordReg ?
                                        "PASSWORD NOT MATCHED" :
                                        passwordReg.length === 0 ? "" : "PASSWORD MATCHED"

                                }
                            </span>
                        </Form.Field>


                        <div className='ml-2 mt-3 mb-2'>
                            <Form.Field>
                                <Checkbox label='Agree to the Terms and Conditions' onClick={onCheckboxClick} />
                            </Form.Field>
                        </div>
                        <div className='my-5 w-full text-center flex justify-center items-center'>
                            <div className='mx-2'>
                                <Button color='blue' onClick={onSubmitUser}
                                    disabled={!checked || (passwordReg !== passwordConfirm) || errorMessage !== "good" || error !== null || name.length < 6}
                                    loading={loading}>
                                    <Icon name='user' /> Signup as User
                                </Button>
                            </div>
                            <div className='mx-2'>
                                <Button color='blue' onClick={onSubmitMerchant}
                                    disabled={!checked || (passwordReg !== passwordConfirm) || errorMessage !== "good" || error !== null || name.length < 6}
                                    loading={loading2}>
                                    <Icon name='google' /> Signup as Merchant
                                </Button>
                            </div>
                        </div>

                    </Form>
                </Modal.Content>
            </Modal>

            {/* TOAST */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

        </>
    )
}

export default Landing