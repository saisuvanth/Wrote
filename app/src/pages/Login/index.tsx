import React, { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNotification } from '../../hooks/useNotification';
import { NotifEnum } from '../../utils/constants';



const Login: FC = () => {
	// const { login } = useApi();
	const notify = useNotification();
	const api_url = process.env.REACT_APP_BACKEND_URL;

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		console.log(formData.get('username'))
		const data = {
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};
		console.log(data);
		axios.post(`${api_url}auth/login`, data).then(res => {
			console.log(res);
			if (res.status === 200) {
				notify({ type: NotifEnum.SUCCESS, message: res.data.message });
				setTimeout(() => {
					// window.location.reload();
				}, 3000);
			} else {
				notify({ type: NotifEnum.ERROR, message: 'Login Failed' });
			}
		})
	}

	const responseGoogle = (res: CredentialResponse) => {
		console.log(res);
	}

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
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
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>

					</form>
					<GoogleLogin
						onSuccess={({ credential }) => {
							// const userInfo = jwtDecode(credential);
							// console.log(userInfo)
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
					{/* <SocialButtonAuth method="In" social="Google" imgLink="https://img.icons8.com/fluency/48/000000/google-logo.png" />
                    <SocialButtonAuth method="In" social="Facebook" imgLink="https://img.icons8.com/fluency/48/000000/facebook-new.png" />
                    <SocialButtonAuth method="In" social="LinkedIn" imgLink="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" /> */}
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login