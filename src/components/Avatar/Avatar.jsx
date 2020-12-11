import PropTypes from "prop-types";

const Avatar = ({ src }) => {
  return (
    <img className="w-full h-full object-cover" src={src} alt="user_avatar" />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
};

Avatar.defaultProps = { src: "" };
export default Avatar;
