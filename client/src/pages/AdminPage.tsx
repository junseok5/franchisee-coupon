import * as React from "react"
import { Helmet } from "react-helmet"
import AdminLoginForm from "src/containers/admin/AdminLoginForm"
import AdminHeader from "src/components/boxes/AdminHeader"
import CenterLayout from "src/components/layout/CenterLayout"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import VerificationStores from "src/containers/admin/VerificationStores"
import InfoLayout from "src/components/layout/InfoLayout"
import AdminAdvertisements from "src/containers/admin/AdminAdvertisements"

const AdminPage: React.SFC = () => {
    const { isAdminLoggedIn, checkAdminLogged, adminToken } = useAdminLogin()

    React.useEffect(() => {
        if (adminToken) {
            checkAdminLogged(adminToken)
        }
    }, [])

    return (
        <>
            <AdminHeader />
            {isAdminLoggedIn ? (
                <>
                    <InfoLayout>
                        <VerificationStores />
                    </InfoLayout>
                    <InfoLayout>
                        <AdminAdvertisements />
                    </InfoLayout>
                </>
            ) : (
                <CenterLayout>
                    <AdminLoginForm />
                </CenterLayout>
            )}
            <Helmet>
                <title>관리자 페이지</title>
            </Helmet>
        </>
    )
}

export default AdminPage
