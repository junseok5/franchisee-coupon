export default function getCategoryName(category: number) {
    const categories = [
        "음식점",
        "카페",
        "편의점/마트",
        "디저트",
        "병원/약국",
        "숙박",
        "엔터테인먼트"
    ]

    return categories[category]
}
