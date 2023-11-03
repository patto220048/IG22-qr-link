import './Loading.scss';
import { useState, CSSProperties } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import * as Dialog from '@radix-ui/react-dialog';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '1px solid black',
};
function Loading({ isLoading, templateLoading }) {
    return (
        <section className="overlay" style={templateLoading ? { position: 'relative' } : { position: 'fixed' }}>
            <div className="loading">
                <HashLoader
                    speedMultiplier={1.5}
                    color={templateLoading ? '#333333' : "#fffffff"}
                    loading={isLoading}
                    // cssOverride={override}
                    cssOverride={override}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </section>
    );
}

export default Loading;
