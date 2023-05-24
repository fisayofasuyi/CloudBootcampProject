import './ProfileHeading.css';
import EditProfileButton from '../components/EditProfileButton';

export default function ProfileHeading(props) {
  const backgroundImage = 'url("https://s3.amazonaws.com/assets.fisayofasuyi.tech/avatars/banners/stock-photo-perfect-anime-image-to-be-used-as-wallpaper-1968490054.jpg")';

  // const backgroundImage = 'file(/c/Users/Dell/Music/aws-bootcamp-cruddur-2023/frontend-react-js/src/components/svg/assets/pexels-eberhard-grossgasteiger-443446.jpg)';
  const styles = {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
  <div className='activity_feed_heading profile_heading'>
    <div className='title'>{props.profile.display_name}</div>
    <div className="cruds_count">{props.profile.cruds_count} Cruds</div>
    <div className="banner" style={styles} >
      <div className="avatar">
        <img src="https://s3.amazonaws.com/assets.fisayofasuyi.tech/avatars/banners/HD-wallpaper-anime-ball-black-dragon-hit-iron-man-naruto-samurai-scale-super-thumbnail.jpg"></img>
      </div>
    </div>
    <div className="info">
      <div className='id'>
        <div className="display_name">{props.profile.display_name}</div>
        <div className="handle">@{props.profile.handle}</div>
      </div>
      <EditProfileButton setPopped={props.setPopped} />
    </div>

  </div>
  );
}