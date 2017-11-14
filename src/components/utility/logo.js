import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';

// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ? <div>
            <h3>
              <Link to="/admin/campaigns">
                <i className={siteConfig.siteIcon} />
              </Link>
            </h3>
          </div>
        : <h3>
            <Link to="/admin/campaigns">
              {siteConfig.siteName}
            </Link>
          </h3>}
    </div>
  );
}
