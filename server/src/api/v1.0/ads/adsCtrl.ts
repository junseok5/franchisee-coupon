import { Request, Response } from "express"

export const read = (req: Request, res: Response) => {
    // 쿠폰 또는 특가 상세보기
}

export const list = (req: Request, res: Response) => {
    // 그냥 홈으로 접속시 최근 등록순으로 조회
    // 위도,경도를 토대로 근처 광고 리스트 조회
    // 카테고리로 광고 리스트 조회
    // 근처를 카테고리로 조회
}

export const write = (req: Request, res: Response) => {
    // 쿠폰 또는 특가 등록
}

export const update = (req: Request, res: Response) => {
    // 쿠폰 또는 특가 수정
}

export const remove = (req: Request, res: Response) => {
    // 쿠폰 또는 특가 삭제
}
