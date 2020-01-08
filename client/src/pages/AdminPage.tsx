import * as React from "react"
import AdminLoginForm from "src/containers/admin/AdminLoginForm"
import AdminHeader from "src/components/boxes/AdminHeader"
import CenterLayout from "src/components/layout/CenterLayout"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import VerificationStores from "src/containers/admin/VerificationStores"

const AdminPage: React.SFC = () => {
    const { isAdminLoggedIn, checkAdminLogged } = useAdminLogin()

    React.useEffect(() => {
        checkAdminLogged()
    }, [])
    
    return (
        <>
            <AdminHeader />
            <CenterLayout>
                {isAdminLoggedIn ? (
                    <>
                        <VerificationStores />
                    </>
                ) : (
                    <AdminLoginForm />
                )}
            </CenterLayout>
        </>
    )
}

export default AdminPage
