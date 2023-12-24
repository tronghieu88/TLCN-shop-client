import React from "react";

const Information = (props) => {
  const { product, loading } = props;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg shadow-lg lg:col-span-1 p-4 border">
          <h2 className="text-lg tracking-tight text-gray-900 font-bold">
            Mô tả sản phẩm
          </h2>
          <p className="font-normal ">{product?.description}</p>
        </div>
        <div className="rounded-lg shadow-lg lg:col-span-1 p-4 border">
          <h2 className="text-lg tracking-tight text-gray-900 font-bold">
            Thông số kỹ thuật{" "}
          </h2>
          <div className="py-4">
            {product?.detailSpecs.map((spec, index) => (
              <div
                className={
                  index % 2
                    ? "flex py-1 pl-1 bg-slate-200"
                    : "flex py-1 pl-1 bg-slate-300"
                  //   +
                  // (index === 0 && "rounded-t-xl") +
                  // (index === product?.detailSpecs?.length - 1 && "rounded-b-xl")
                }
                key={index}
              >
                <span className="w-[35%]">{spec?.name}</span>
                <span className="w-auto">{spec?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;

const Loading = () => {};
