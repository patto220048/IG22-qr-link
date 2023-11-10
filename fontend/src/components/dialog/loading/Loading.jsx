import './Loading.scss';
import { useState, CSSProperties } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import DotLoader from 'react-spinners/DotLoader';
import * as Dialog from '@radix-ui/react-dialog';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '1px solid black',
};
function Loading({ isLoading, templateLoading, InputUrlLoading }) {
    return (
        <section className="overlay" style={templateLoading ? { position: 'relative' } : { position: 'fixed' }}>
            <div className="loading">
                {!InputUrlLoading ? (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <DotLoader
                        color={"#ffffff"}
                        loading={isLoading}
                        cssOverride={override}
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={1.5}
                    />
                )}
            </div>
        </section>
    );
}

export default Loading;
