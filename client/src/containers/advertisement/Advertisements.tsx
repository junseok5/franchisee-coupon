import * as React from "react"
import Advertisement from "./Advertisement"
import useLoadAdvertisements from "src/hooks/advertisement/useLoadAdvertisements"
import { useParams } from "react-router-dom"
import useRadius from "src/hooks/etc/useRadius"
import ErrorNotice from "src/components/boxes/ErrorNotice"
import HomeLoading from "src/components/etc/HomeLoading"

interface AdvertisementsProps {}

const Advertisements: React.SFC<AdvertisementsProps> = () => {
    const {
        isLoadingAdvertisements,
        advertisements,
        loadAdvertisements
    } = useLoadAdvertisements()
    const { radius } = useRadius()
    const { storeId, category } = useParams()

    React.useEffect(() => {
        let query = {}

        query = storeId
            ? {
                  storeId,
                  radius
              }
            : {}
        query = category
            ? {
                  ...query,
                  category
              }
            : {
                  ...query
              }

        loadAdvertisements(query)
    }, [radius, category])

    return (
        <>
            {isLoadingAdvertisements ? (
                <HomeLoading />
            ) : advertisements.length ? (
                advertisements.map(ad => <Advertisement key={ad.id} ad={ad} />)
            ) : (
                <ErrorNotice>주변에 등록된 광고가 없습니다.</ErrorNotice>
            )}
        </>
    )
}

export default Advertisements
