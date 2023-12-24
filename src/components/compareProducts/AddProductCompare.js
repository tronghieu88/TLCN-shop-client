import React from "react";

const AddProductCompare = () => {
  return (
    <div class="grid gap-6 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="component component-CerCheckBox">
        <div class="bg-blue-light mb-4 h-100 shadow hover:shadow-lg h-full flex flex-col">
          <div class="p-4 flex-1">
            <div>
              <strong class="text-blue-dark text-xl leading-normal mt-0 mb-2 hover:underline">
                asdfasd1
              </strong>
            </div>
            <p>asdfasd1</p>
          </div>
          <div class="bg-black py-2.5 px-4 hover:bg-blue-light">
            <span class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>
              <span class="hover:underline hover:text-black">sdfs1</span>
            </span>
            <button type="button" class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>
              <span class="hover:underline hover:text-black">sdfs1</span>
            </button>
          </div>
        </div>
      </div>
      <div class="component component-CerCheckBox">
        <div class="group transition bg-blue-200 hover:bg-gray-200 mb-4 h-100 shadow hover:shadow-lg h-full flex flex-col group-hover:cursor-pointer">
          <div class="p-4 flex-1">
            <div>
              <strong class="text-blue-900 group-hover:text-gray-900 text-xl leading-normal mt-0 mb-2 hover:underline">
                asdfasd1
              </strong>
            </div>
            <p>asdfasd1</p>
          </div>
          <div class="group-hover:bg-gray-500 bg-blue-500 py-2.5 px-4 hover:bg-blue-light">
            <span class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>
              <span class="hover:underline hover:text-black">sdfs1</span>
            </span>
            <button type="button" class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>
              <span class="hover:underline hover:text-black">sdfs1</span>
            </button>
          </div>
        </div>
      </div>
      <div class="component component-CerCheckBox">
        <div class="bg-blue-light mb-4 h-100 shadow hover:shadow-lg h-full">
          <div class="p-4">
            <div>
              <strong class="text-blue-dark text-xl leading-normal mt-0 mb-2 hover:underline">
                asdfasd2
              </strong>
            </div>
            <p>asdfasd2</p>
            <p>asdfasd2</p>
            <p>asdfasd2</p>
          </div>

          <div class="bg-blue-dark py-2.5 px-4 hover:bg-blue-light">
            <span class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>

              <span class="hover:underline hover:text-black">sdfs2</span>
            </span>
            <button type="button" class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>

              <span class="hover:underline hover:text-black">sdfs2</span>
            </button>
          </div>
        </div>
      </div>

      <div class="component component-CerCheckBox flex-1">
        <div class="bg-blue-light mb-4 h-100 shadow hover:shadow-lg h-full">
          <div class="p-4">
            <div>
              <strong class="text-blue-dark text-xl leading-normal mt-0 mb-2 hover:underline">
                asdfasd3
              </strong>
            </div>
            <p>asdfasd3</p>
          </div>

          <div class="bg-blue-dark py-2.5 px-4 hover:bg-blue-light">
            <span class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>

              <span class="hover:underline hover:text-black">sdfs3</span>
            </span>
            <button type="button" class="text-white">
              <span class="k-icon k-i-arrow-right hover:text-black"></span>

              <span class="hover:underline hover:text-black">sdfs3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductCompare;
