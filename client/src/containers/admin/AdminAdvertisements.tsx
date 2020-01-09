import * as React from "react"
import BoxContainer from "src/components/boxes/BoxContainer"
import Title from "src/components/elements/Title"
import FlexListLayout from "src/components/layout/FlexListLayout"
import useLoadAdminAdvertisements from "src/hooks/admin/useLoadAdminAdvertisements"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import Loading from "src/components/etc/Loading"
import AdminAdvertisement from "./AdminAdvertisement"
import ErrorNotice from "src/components/boxes/ErrorNotice"

interface AdminAdvertisementsProps {}

const AdminAdvertisements: React.SFC<AdminAdvertisementsProps> = () => {
    const {
        isLoadingAdvertisements,
        advertisements,
        loadAdvertisements
    } = useLoadAdminAdvertisements()
    const { adminToken } = useAdminLogin()

    React.useEffect(() => {
        if (adminToken) {
            loadAdvertisements(adminToken)
        }
    }, [])

    return (
        <BoxContainer>
            <Title>광고 목록</Title>

            {isLoadingAdvertisements ? (
                <Loading />
            ) : advertisements.length ? (
                <FlexListLayout>
                    {advertisements.map(advertisement => (
                        <AdminAdvertisement
                            key={advertisement.id}
                            advertisement={advertisement}
                        />
                    ))}
                </FlexListLayout>
            ) : (
                <ErrorNotice>등록된 광고가 없습니다.</ErrorNotice>
            )}
        </BoxContainer>
    )
}

export default AdminAdvertisements
