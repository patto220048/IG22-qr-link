import './DetailContact.scss';

function DetailContact() {
    return (
        <section className="DetailContact">
            <span className="DetailContact-title-content">
                Contact Detail
                <br />
                <p className="DetailContact-desc">
                    Display your contact details for visitors. Only the information you enter will be displayed.
                </p>
            </span>
            <form className="DetailContact-group">
                <span className="DetailContact-title">Name</span>
                <div className="DetailContact-name_group">
                    <input type="text" className="DetailContact_items" placeholder="First Name" />
                    <input type="text" className="DetailContact_items" placeholder="Last Name" />
                </div>
                <span className="DetailContact-title">Occupation</span>
                <input type="text" className="DetailContact_items" placeholder="Organization" />
                <input type="text" className="DetailContact_items" placeholder="Position" />
                <span className="DetailContact-title">Email Work</span>
                <input type="text" className="DetailContact_items" placeholder="Email Address" />
                <span className="DetailContact-title">Phone</span>
                <input type="text" className="DetailContact_items" placeholder="Number" />
                <span className="DetailContact-title">Address</span>
                <input type="text" className="DetailContact_items" placeholder="Country" />
                <input type="text" className="DetailContact_items" placeholder="State/Province" />
                <input type="text" className="DetailContact_items" placeholder="City" />
                <input type="text" className="DetailContact_items" placeholder="Street Address" />
                <input type="text" className="DetailContact_items" placeholder="Apartment, etc.." />
            </form>
        </section>
    );
}

export default DetailContact;
