import ForgotPasswordComp from 'components/forgot-password';
import Head from 'next/head';
import MainLayout from 'components/common/layout';
import PageWithLayoutType from 'types/page-with-layout';
import { useContext, useEffect } from 'react';
import { authContext, ContextProps } from 'utils/auth-provider';

const ForgotPasswordPage: React.FC = () => {
  const auth = useContext<ContextProps>(authContext);
  useEffect(() => {
    auth.dispatch({ type: 'LOGOUT_USER' });
  }, []);

  return (
    <div>
      <Head>
        <title>Login | ConnectIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForgotPasswordComp />
    </div>
  );
};

(ForgotPasswordPage as PageWithLayoutType).layout = MainLayout;

export default ForgotPasswordPage;
