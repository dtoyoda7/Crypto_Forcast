import { useSelector } from "src/store/Store";
import { Swiper, SwiperSlide } from "swiper/react";
import DashboardCard from "src/components/shared/DashboardCard";

import './Dashboard.css';

const DashboardCards = () => {
    const { cryptoDataSet } = useSelector((state) => state.cryptoReducer);

    return (
        <Swiper
            className="mySwiper"
            loop={true}
            freeMode={true}
            slidesPerView={1}
            breakpoints={{
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1440: {
                    slidesPerView: 3,
                },
                1700: {
                    slidesPerView: 4,
                },
            }}
        >
            {
                cryptoDataSet?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <DashboardCard dataSource={item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export { DashboardCards };