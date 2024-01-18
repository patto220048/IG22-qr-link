import { useEffect, useRef } from 'react';
import './DetailContact.scss';
import { useSelector } from 'react-redux';

function DetailContact({ setIsDetail, isDetail, onChange, user }) {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <section className="DetailContact">
            <span className="DetailContact-title-content">
                Contact Detail
                <br />
                <p className="DetailContact-desc">
                    Display your contact details for visitors. Only the information you enter will be displayed.
                </p>
            </span>
            <form className="DetailContact-group" method='PUT' >
                <span className="DetailContact-title">Name</span>
                <div className="DetailContact-name_group">
                    <input
                        name="firstName"
                        id="firstName"
                        type="text"
                        className="DetailContact_items"
                        placeholder="First Name"
                        onChange={(e) => onChange(e)}
                        defaultValue={
                            currentUser?.firstName ? currentUser?.firstName : user?.firstName
                        }
                    />
                    <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        className="DetailContact_items"
                        placeholder="Last Name"
                        onChange={(e) => onChange(e)}
                        defaultValue={
                            currentUser?.lastName ? currentUser?.lastName : user?.lastName
                        }
                    />
                </div>
                <span className="DetailContact-title">Occupation</span>
                <input
                    name="organization"
                    id="organization"
                    type="text"
                    className="DetailContact_items"
                    placeholder="Organization"
                    onChange={(e) => onChange(e)}
                    defaultValue={
                        currentUser?.organization
                            ? currentUser?.organization
                            : user?.organization
                    }
                />
                <input
                    name="position"
                    id="position"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Position"
                    defaultValue={
                        currentUser?.position ? currentUser?.position : user?.position
                    }
                />
                <span className="DetailContact-title">Email Work</span>
                <input
                    name="emailWork"
                    id="emailWork"
                    type="email"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Email Address"
                    defaultValue={
                        currentUser?.emailWork ? currentUser?.emailWork : user?.emailWork
                    }
                />
                <span className="DetailContact-title">Phone</span>
                <input
                    name="phone"
                    id="phone"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Number"
                    defaultValue={
                        currentUser?.phone ? currentUser?.phone : user?.phone
                    }
                />
                <span className="DetailContact-title">Address</span>
                <input
                    name="country"
                    id="country"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Country"
                    defaultValue={
                        currentUser?.country ? currentUser?.country : user?.country
                    }
                />
                <input
                    name="state"
                    id="state"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="State/Province"
                    defaultValue={
                        currentUser?.state ? currentUser?.state : user?.state
                    }
                />
                <input
                    name="city"
                    id="city"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="City"
                    defaultValue={
                        currentUser?.city ? currentUser?.city : user?.city
                    }
                />
                <input
                    name="street"
                    id="street"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Street Address"
                    defaultValue={currentUser?.street ? currentUser?.street : user?.street }

                />
                <input
                    name="apartment"
                    id="apartment"
                    type="text"
                    className="DetailContact_items"
                    onChange={(e) => onChange(e)}
                    placeholder="Apartment, etc.."
                    defaultValue={currentUser?.apartment ? currentUser?.apartment : user?.apartment }
                />
               
            </form>
        </section>
    );
}

export default DetailContact;
