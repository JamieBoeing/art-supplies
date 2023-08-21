import { useState } from 'react';
import styles from './AuthPage.modules.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';


export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main className={styles.AuthPage}>
            <div className={styles.AuthTop}>
            <div className={styles.AuthPageLogo}>
                <Logo />
                </div>
                <h3 className={styles.BoldWhiteText} onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
            {showLogin ? <LoginForm setUser={setUser} />: <SignUpForm setUser={setUser} />}
            </div>
            {/* <div className={styles.AuthBottom}>
                <div className={styles.ImageContainer}>
                    <img
                        src ="https://i.imgur.com/SvipfsU.jpeg"
                        alt="jars-1"
                    />
                </div>
                <div className={styles.ImageContainer}>
                    <img
                        src ="https://i.imgur.com/fkpeQk1.jpeg"
                        alt="jars-2"
                    />
                </div>
                <div className={styles.ImageContainer}>
                    <img
                        src ="https://i.imgur.com/DHQ6dMb.jpeg"
                        alt="jars-3"
                    />
                </div>
            </div> */}
        </main>
    );
}