import * as React from "react"
import Advertisement from "./Advertisement"
import useLoadAdvertisements from "src/hooks/advertisement/useLoadAdvertisements"
import Loading from "src/components/etc/Loading"
import { useParams } from "react-router-dom"
import useRadius from "src/hooks/etc/useRadius"

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
                <Loading />
            ) : (
                advertisements.map(ad => <Advertisement key={ad.id} ad={ad} />)
            )}
        </>
    )
}

export default Advertisements
