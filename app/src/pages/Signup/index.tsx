import React, { FC, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNotification } from '../../hooks/useNotification';
import { NotifEnum } from '../../utils/constants';
import axios from 'axios';

const Signup: FC = () => {
	const notify = useNotification();

	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		console.log(formData.get('username'))
		const data = {
			firstName: formData.get('firstname') as string,
			lastName: formData.get('lastname') as string,
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			// setMsg(res.message)
			notify({ type: NotifEnum.SUCCESS, message: res.message });
		} catch (err: any) {
			if (err.response && err.response.status >= 400 && err.response.status <= 500) {
				notify({ type: NotifEnum.ERROR, message: err.response.data.message });
				// setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							required
							className={styles.input}
						/>
						<ul className={styles.info}>A valid Password must satisfy the following-:
							<li>At least one uppercase letter</li>
							<li>At least one lowercase letter</li>
							<li>At least one digit</li>
							<li>At least one special symbol</li>
							<li>Should be more than 8 character</li>
						</ul>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						{/* {msg && <div className={styles.success_msg}>{msg}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
						{/* <SocialButtonAuth method="Up" social="Google" imgLink="https://img.icons8.com/fluency/48/000000/google-logo.png" />
						<SocialButtonAuth method="Up" social="Facebook" imgLink="https://img.icons8.com/fluency/48/000000/facebook-new.png" />
						<SocialButtonAuth method="Up" social="LinkedIn" imgLink="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" /> */}
					</form>
					<GoogleLogin
						onSuccess={credentialResponse => {
							console.log(credentialResponse);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
					{/* <FacebookLogin
						appId="578720593665630"
						autoLoad={true}
						fields="name,email,picture"
						onClick={componentClicked}
						callback={responseFacebook}
						className={styles.socialButton}
					/>, */}
				</div>
			</div>
		</div>
	)
}

export default Signup;