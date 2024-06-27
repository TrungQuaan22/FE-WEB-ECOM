import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('item-text')}>
                    <h2 className={cx('item-label')}>Giới thiệu</h2>
                    <div className={cx('item-body')}>
                        <p>Project 1</p>
                        <p>GVHD: PGS.TS. Ngô Quỳnh Thu</p>
                    </div>
                </div>

                <div className={cx('item-text')}>
                    <h2 className={cx('item-label')}>Sản phẩm</h2>
                    <div className={cx('item-body')}>
                        <p>Quần</p>
                        <p>Áo</p>
                        <p>Váy</p>
                        <p>Phụ kiện</p>
                    </div>
                </div>

                <div className={cx('item-text')}>
                    <h2 className={cx('item-label')}>Sinh viên thực hiện: </h2>
                    <div className={cx('item-body')}>
                        <p>Giang Trung Quân 20215463</p>
                    </div>
                </div>

                <div className={cx('item-contact')}>
                    <h2 className={cx('item-label')}>Liên hệ với chúng tôi</h2>
                    <div className={cx('social')}>
                        <img className={cx('icon-social')} src={images.fb_logo} alt="facebook" />
                        <img className={cx('icon-social')} src={images.ins_logo} alt="instagram" />
                        <img className={cx('icon-social')} src={images.tiktok_logo} alt="tiktok" />
                        <img className={cx('icon-social')} src={images.yt_logo} alt="youtube" />
                        <img className={cx('icon-social')} src={images.twitter_logo} alt="twitter" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
