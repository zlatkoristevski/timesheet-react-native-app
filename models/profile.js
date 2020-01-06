class Profile {
    constructor(profileName, profileEmail, profilePassword, profileNewPassword, profileRepeatNewPassword) {
        this.profile_name = profileName;
        this.profile_email = profileEmail;
        this.profile_password = profilePassword;
        this.profile_new_password = profileNewPassword;
        this.profile_repeat_new_password = profileRepeatNewPassword;
    }
}

export default Profile;
