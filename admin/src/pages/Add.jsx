import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backEndURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("fertilizers and pesticides");
  // subCategory removed — not used anymore
  const [sizes, setSizes] = useState([
    { value: "", unit: "kg" },
    { value: "", unit: "kg" },
    { value: "", unit: "kg" },
  ]);
  const [bestseller, setBestseller] = useState(false);

  const [loader, setLoader] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      // subCategory removed — not sent anymore
      formData.append("bestseller", bestseller);
      const formattedSizes = sizes
        .filter((s) => s.value !== "" && s.value !== null && s.value !== undefined)
        .map((s) => `${s.value}${s.unit === "kg" ? "kg" : "L"}`);
      formData.append("sizes", JSON.stringify(formattedSizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backEndURL + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setBestseller("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setCategory("fertilizers and pesticides");
        // subCategory removed — no reset needed
        setPrice("");
        setSizes([{ value: "", unit: "kg" },{ value: "", unit: "kg" },{ value: "", unit: "kg" }]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          type="tex"
          placeholder="Write Content Here..."
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">{"Product Category"}</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="fertilizers and pesticides">fertilizers and pesticides</option>
            <option value="Seeds">Seeds</option>
            <option value="Cereal and Vegies">Cereal and Vegies</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes (numeric)</p>
        <p className="text-xs text-gray-500 mb-2">Enter up to 3 numeric sizes and choose unit (kg or Ltr)</p>
        <div className="flex flex-col gap-3">
          {sizes.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="number"
                placeholder="e.g., 35"
                value={s.value}
                min="0"
                step="any"
                onChange={(e) =>
                  setSizes((prev) => {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], value: e.target.value };
                    return copy;
                  })
                }
                className="px-3 py-2 w-[120px] border"
              />
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`unit-${idx}`}
                    value="kg"
                    checked={s.unit === "kg"}
                    onChange={() =>
                      setSizes((prev) => {
                        const copy = [...prev];
                        copy[idx] = { ...copy[idx], unit: "kg" };
                        return copy;
                      })
                    }
                  />
                  Kg
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`unit-${idx}`}
                    value="L"
                    checked={s.unit === "L"}
                    onChange={() =>
                      setSizes((prev) => {
                        const copy = [...prev];
                        copy[idx] = { ...copy[idx], unit: "L" };
                        return copy;
                      })
                    }
                  />
                  Ltr
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-red-600"
                onClick={() =>
                  setSizes((prev) => {
                    const copy = [...prev];
                    copy[idx] = { value: "", unit: "kg" };
                    return copy;
                  })
                }
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white"
        disabled={loader}
      >
        {loader ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default Add;
