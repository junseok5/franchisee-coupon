import { useSelector } from "react-redux"
import { RootState } from "src/store/reducers"
import { OwnerMetaInfo } from "src/store/reducers/owner"

export default function useOwnerInfo() {
    const { me, token } = useSelector((state: RootState) => state.owner)

    return { me, token } as { me: OwnerMetaInfo; token: string }
}
