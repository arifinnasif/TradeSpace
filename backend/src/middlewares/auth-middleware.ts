import passport from 'passport';

export const userAuth = passport.authenticate('user-rule', { session: false });

export const nonPhoneVerifiedUserAuth = passport.authenticate('non-phone-verified-user-rule', { session: false });

export const adminAuth = passport.authenticate('admin-rule', { session: false });