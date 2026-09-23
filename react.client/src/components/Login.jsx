import { useState } from 'react';
import { loginWithGitHub } from '../firebase/authService';
import './styles/Login.css';

export default function Login({ onLoginSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGitHubLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await loginWithGitHub();
            onLoginSuccess?.();
        } catch (err) {
            console.error(err);
            setError('Не вдалося увійти через GitHub. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand">
                    <span className="login-icon">⚽</span>
                    <h1>Футбольна ліга</h1>
                    <p>Менеджер гравців та команд</p>
                </div>

                <div className="login-content">
                    <h2>Вхід в систему</h2>
                    <p className="login-subtitle">
                        Увійдіть через GitHub, щоб керувати гравцями та командами
                    </p>

                    {error && <div className="login-error">{error}</div>}

                    <button
                        className="login-btn github"
                        onClick={handleGitHubLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-sm"></span>
                                Вхід...
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                Увійти через GitHub
                            </>
                        )}
                    </button>

                    <div className="login-footer">
                        <span>Захищено Firebase Authentication</span>
                    </div>
                </div>
            </div>
        </div>
    );
}