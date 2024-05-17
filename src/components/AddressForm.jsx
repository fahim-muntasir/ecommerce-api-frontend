import "./AddressForm.css";

export default function AddressForm({ formData, handleInputChange }) {
  return (
    <form className="cart-form">
      <div className="formGroup">
        <div>
          <p className="personal-information-title">Name *</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p className="personal-information-title">Phone *</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="formGroup">
        <div>
          <p className="personal-information-title">City *</p>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p className="personal-information-title">Area *</p>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="addressInput">
        <p className="personal-information-title">Address *</p>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          cols="30"
          rows="5"
        ></textarea>
      </div>
    </form>
  );
}
