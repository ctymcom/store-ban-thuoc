
export function ProductDescription() {
    return <>
        <div className="grid grid-cols-1 mt-7">
            <h3 className="product__heading font-bold text-lg leading-9">Công dụng (Chỉ định)</h3>
            <p className="product__desc leading-7 text-sm">
                Cung cấp vitamin và muối khoáng trong những trường hợp sau: Thể chất yếu, chán ăn, loạn dưỡng,
                mệt mỏi, gầy mòn, stress, trẻ đang tuổi lớn và người già yếu mệt mỏi, gầy mòn, stress,
                trẻ đang tuổi lớn và người già yếu.
                    <br /><br />
                    Là thuốc bổ và giảm mệt mỏi trong các trường hợp suy giảm thể chất khi đang bị bệnh hoặc trong
                    giai đoạn hồi phục.
                    </p>
        </div>
        <div className="grid grid-cols-1 mt-7">
            <h3 className="product__heading font-bold text-lg leading-9">Liều dùng</h3>
            <p className="product__desc leading-7 text-sm">
                Người lớn: 1 viên nang mềm mỗi ngày.
                    </p>
            <a href="#" className="product__detail text-sm text-success">Xem chi tiết</a>
        </div>
        <div className="grid grid-cols-1 mt-7">
            <h3 className="product__heading font-bold text-lg leading-9">Không sử dụng trong trường hợp sau (Chống chỉ định)</h3>
            <p className="product__desc leading-7 text-sm">
                Phụ nữ có thai 3 tháng đầu. Bệnh nhân tăng calci huyết, hội chứng thận hư.
                    </p>
            <a href="#" className="product__detail text-sm text-success">Xem chi tiết</a>
        </div>
        <div className="grid grid-cols-1 mt-7">
            <h3 className="product__heading font-bold text-lg leading-9">Lưu ý khi sử dụng (Cảnh báo và thận trọng)</h3>
            <p className="product__desc  text-sm">
                Không được dùng Vitamin A vượt quá 5.000 đơn vị quốc tế mỗi ngày ở phụ nữ trong 3 tháng đầu của thai kỳ hoặc phụ nữ có khả năng mang thai (ngoại trừ bệnh nhân thiếu Vitamin A).
                <br /><br />
                Thận trọng với bệnh nhân dị ứng với bất cứ thành phần nào của thuốc.
                <br /><br />
                Hỏi ý kiến bác sĩ hoặc dược sĩ trước khi dùng thuốc đối với các trường hợp: Trẻ em dưới 4 tuổi. Bệnh nhân đang điều trị liệu pháp đặc biệt. Phụ nữ có thai và cho con bú.
                <br /><br />
            </p>
            <a href="#" className="product__detail text-sm text-success">Xem chi tiết</a>
        </div>
        <div className="grid grid-cols-1 mt-7">
            <h3 className="product__heading font-bold text-lg leading-9">Tác dụng không mong muốn (Tác dụng phụ)</h3>
            <p className="product__desc text-sm">
                Buồn nôn, nôn mửa, tiêu chảy, ngứa, khó chịu ở dạ dày, táo bón, nổi ban, đỏ da.
                <br /><br />
                Có thể gặp đa kinh hoặc rối loạn kinh nguyệt khi dùng. Nếu tình trạng kéo dài, hỏi ý kiến bác sĩ hay dược sĩ.
            </p>
            <a href="#" className="product__detail text-sm text-success">Xem chi tiết</a>
        </div>
    </>;
}   