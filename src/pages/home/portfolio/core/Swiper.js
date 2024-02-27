<Swiper
className="categoriesFilter"
slidesPerView={3}
spaceBetween={10}
navigation={true}
modules={[Navigation]}
breakpoints={{
  640: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 50,
  },
}}       
>
  {categoriesData?.data.map((categoryItem) =>
(
    <SwiperSlide key={categoryItem.id} className='slide'>
      <div className='category-icon'>
        <img src={`${uploadsBaseURL}${categoryItem.image}`} alt='category' />
      </div>
      <div className="category-name">
        <span>{categoryItem?.name}</span>
      </div>
    </SwiperSlide>
  ))}

</Swiper>