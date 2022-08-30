import React, { useState } from 'react';
import { footerConf } from './footerData';
import { LABELS } from '../../constants';

export const Footer = () => {
  const [open, setOpen] = useState(false);

  (props: { status: any; message: any; onValidated: any }) => {
    return (
      <>
        {props.status ? (
          <div
            style={{
              background: 'rgb(217,217,217)',
              borderRadius: 2,
              padding: 10,
              display: 'inline-block',
            }}
          >
            {props.status === 'sending' && (
              <div style={{ color: 'blue' }}>Loading...</div>
            )}
            {props.status === 'error' && (
              <div
                style={{ color: 'red' }}
                dangerouslySetInnerHTML={{ __html: props.message }}
              />
            )}
            {props.status === 'success' && (
              <div
                style={{ color: 'green' }}
                dangerouslySetInnerHTML={{ __html: props.message }}
              />
            )}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div
      className="footer-container"
      onMouseOver={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
      onBlur={() => setOpen(false)}
    >
      <div className="isCenter">
        <img
          onClick={e => e.stopPropagation()}
          src={'/metaplex-logo.png'}
          width={250}
        />
      </div>

      {open ? (
        <img
          src={'/hoverApe.png'}
          className="m-auto hoverApe"
          width={180}
          alt="yes"
        />
      ) : (
        <div />
      )}

      <div className="footer-info">
        {footerConf.components.map((component, ii) => (
          <div className="footer-section-container" key={ii}>
            <div className="footer-link" style={{ textTransform: 'uppercase' }}>
              {component.title}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-foot">
        <div className="small-body footer-link">
          Copyright. {LABELS.STORE_NAME} 2022
        </div>
      </div>
    </div>
  );
};
