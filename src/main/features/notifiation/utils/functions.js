import { STRINGS } from "../../../../utils/base";

export const handleRedirect = (
    featureId = 2,
    referenceId = STRINGS.DEFAULTS.guid,
    navigate = () => { }
) => {
    navigate(`/newsFeedDetails/${referenceId}`)
}