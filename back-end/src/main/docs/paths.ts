import {
    loginPath,
    signUpPath,
    contentsPath,
    updateContentsPath,
    oneContentPath,
    paginationContentPath,
    uploadImageContentPath,
    deleteUploadImageContentPath,
    usersPath,
    deleteContentsPath,
    updateUsersPath,
    oneUserPath,
    forgotPasswordPath,
    resetPasswordPath,
    loadContentsByAdminPath,
    oneContentByAdminPath,
    loadFilesPath,
    retrieveLastContentsUpdatePath,
    retrieveContentByAuthorPath
} from './paths/'

export default {
    '/login': loginPath,
    '/signup': signUpPath,
    '/contents/': contentsPath,
    '/contents': paginationContentPath,
    '/contents/{Id}': updateContentsPath,
    '/contents/{contentId}': deleteContentsPath,
    '/contents/{Slug}': oneContentPath,
    '/upload/': uploadImageContentPath,
    '/upload/{image}': deleteUploadImageContentPath,
    '/register/auth/users': usersPath,
    '/register/auth/users/{Id}': updateUsersPath,
    '/register/auth/users/{userId}': oneUserPath,
    '/forgot-password': forgotPasswordPath,
    '/reset-password': resetPasswordPath,
    '/contents-by-admin': loadContentsByAdminPath,
    '/contents-by-admin/{Id}': oneContentByAdminPath,
    '/upload/files': loadFilesPath,
    '/contents/dashboard/last-update': retrieveLastContentsUpdatePath,
    '/contents/dashboard/count-by-authors': retrieveContentByAuthorPath
}

