/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/profile/route";
exports.ids = ["app/api/profile/route"];
exports.modules = {

/***/ "(rsc)/./app/api/profile/route.ts":
/*!**********************************!*\
  !*** ./app/api/profile/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_Profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Profile */ \"(rsc)/./models/Profile.ts\");\n// app/api/profile/route.ts\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const profile = await _models_Profile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({}).lean();\n        if (!profile) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                data: {\n                    heroImage: '',\n                    aboutImage: ''\n                }\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: profile\n        });\n    } catch (error) {\n        console.error('GET /api/profile error (using fallback settings):', error);\n        // Graceful fallback so profiles still load\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: {\n                heroImage: '',\n                aboutImage: ''\n            },\n            fallback: true\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio_admin_secret';\n        if (req.headers.get('x-admin-password') !== adminPassword) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Unauthorized'\n            }, {\n                status: 401\n            });\n        }\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const body = await req.json();\n        const { heroImage, aboutImage } = body;\n        const updateFields = {\n            updatedAt: new Date()\n        };\n        if (typeof heroImage === 'string') updateFields.heroImage = heroImage;\n        if (typeof aboutImage === 'string') updateFields.aboutImage = aboutImage;\n        const profile = await _models_Profile__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOneAndUpdate({}, {\n            $set: updateFields\n        }, {\n            new: true,\n            upsert: true\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: profile\n        });\n    } catch (error) {\n        console.error('POST /api/profile error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: 'Failed to update profile settings'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2ZpbGUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQkFBMkI7QUFDNkI7QUFDbEI7QUFDQztBQUVoQyxlQUFlRztJQUNwQixJQUFJO1FBQ0YsTUFBTUYsd0RBQVNBO1FBQ2YsTUFBTUcsVUFBVSxNQUFNRix1REFBT0EsQ0FBQ0csT0FBTyxDQUFDLENBQUMsR0FBR0MsSUFBSTtRQUU5QyxJQUFJLENBQUNGLFNBQVM7WUFDWixPQUFPSixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO2dCQUN2QkMsU0FBUztnQkFDVEMsTUFBTTtvQkFBRUMsV0FBVztvQkFBSUMsWUFBWTtnQkFBRztZQUN4QztRQUNGO1FBRUEsT0FBT1gscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU1DLE1BQU1MO1FBQVE7SUFDMUQsRUFBRSxPQUFPUSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxxREFBcURBO1FBQ25FLDJDQUEyQztRQUMzQyxPQUFPWixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RDLE1BQU07Z0JBQUVDLFdBQVc7Z0JBQUlDLFlBQVk7WUFBRztZQUN0Q0csVUFBVTtRQUNaO0lBQ0Y7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxnQkFBZ0JDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYyxJQUFJO1FBQ3BELElBQUlKLElBQUlLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QkwsZUFBZTtZQUN6RCxPQUFPakIscURBQVlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsU0FBUztnQkFBT0ksT0FBTztZQUFlLEdBQUc7Z0JBQUVXLFFBQVE7WUFBSTtRQUNwRjtRQUVBLE1BQU10Qix3REFBU0E7UUFDZixNQUFNdUIsT0FBTyxNQUFNUixJQUFJVCxJQUFJO1FBQzNCLE1BQU0sRUFBRUcsU0FBUyxFQUFFQyxVQUFVLEVBQUUsR0FBR2E7UUFFbEMsTUFBTUMsZUFBNkU7WUFDakZDLFdBQVcsSUFBSUM7UUFDakI7UUFFQSxJQUFJLE9BQU9qQixjQUFjLFVBQVVlLGFBQWFmLFNBQVMsR0FBR0E7UUFDNUQsSUFBSSxPQUFPQyxlQUFlLFVBQVVjLGFBQWFkLFVBQVUsR0FBR0E7UUFFOUQsTUFBTVAsVUFBVSxNQUFNRix1REFBT0EsQ0FBQzBCLGdCQUFnQixDQUM1QyxDQUFDLEdBQ0Q7WUFBRUMsTUFBTUo7UUFBYSxHQUNyQjtZQUFFSyxLQUFLO1lBQU1DLFFBQVE7UUFBSztRQUc1QixPQUFPL0IscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU1DLE1BQU1MO1FBQVE7SUFDMUQsRUFBRSxPQUFPUSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9aLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFPSSxPQUFPO1FBQW9DLEdBQUc7WUFBRVcsUUFBUTtRQUFJO0lBQ3pHO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbW9oaXRcXE9uZURyaXZlXFxEZXNrdG9wXFxQb3J0Zm9saW9cXHBvcnRmb2xpby1hcHBcXGFwcFxcYXBpXFxwcm9maWxlXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL3Byb2ZpbGUvcm91dGUudHNcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgY29ubmVjdERCIGZyb20gJ0AvbGliL21vbmdvZGInO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSAnQC9tb2RlbHMvUHJvZmlsZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgY29ubmVjdERCKCk7XG4gICAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IFByb2ZpbGUuZmluZE9uZSh7fSkubGVhbigpO1xuXG4gICAgaWYgKCFwcm9maWxlKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkYXRhOiB7IGhlcm9JbWFnZTogJycsIGFib3V0SW1hZ2U6ICcnIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9maWxlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0dFVCAvYXBpL3Byb2ZpbGUgZXJyb3IgKHVzaW5nIGZhbGxiYWNrIHNldHRpbmdzKTonLCBlcnJvcik7XG4gICAgLy8gR3JhY2VmdWwgZmFsbGJhY2sgc28gcHJvZmlsZXMgc3RpbGwgbG9hZFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZGF0YTogeyBoZXJvSW1hZ2U6ICcnLCBhYm91dEltYWdlOiAnJyB9LFxuICAgICAgZmFsbGJhY2s6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYWRtaW5QYXNzd29yZCA9IHByb2Nlc3MuZW52LkFETUlOX1BBU1NXT1JEIHx8ICdwb3J0Zm9saW9fYWRtaW5fc2VjcmV0JztcbiAgICBpZiAocmVxLmhlYWRlcnMuZ2V0KCd4LWFkbWluLXBhc3N3b3JkJykgIT09IGFkbWluUGFzc3dvcmQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBjb25uZWN0REIoKTtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB7IGhlcm9JbWFnZSwgYWJvdXRJbWFnZSB9ID0gYm9keTtcblxuICAgIGNvbnN0IHVwZGF0ZUZpZWxkczogeyBoZXJvSW1hZ2U/OiBzdHJpbmc7IGFib3V0SW1hZ2U/OiBzdHJpbmc7IHVwZGF0ZWRBdDogRGF0ZSB9ID0ge1xuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgIH07XG4gICAgXG4gICAgaWYgKHR5cGVvZiBoZXJvSW1hZ2UgPT09ICdzdHJpbmcnKSB1cGRhdGVGaWVsZHMuaGVyb0ltYWdlID0gaGVyb0ltYWdlO1xuICAgIGlmICh0eXBlb2YgYWJvdXRJbWFnZSA9PT0gJ3N0cmluZycpIHVwZGF0ZUZpZWxkcy5hYm91dEltYWdlID0gYWJvdXRJbWFnZTtcblxuICAgIGNvbnN0IHByb2ZpbGUgPSBhd2FpdCBQcm9maWxlLmZpbmRPbmVBbmRVcGRhdGUoXG4gICAgICB7fSxcbiAgICAgIHsgJHNldDogdXBkYXRlRmllbGRzIH0sXG4gICAgICB7IG5ldzogdHJ1ZSwgdXBzZXJ0OiB0cnVlIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZmlsZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQT1NUIC9hcGkvcHJvZmlsZSBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlIHNldHRpbmdzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29ubmVjdERCIiwiUHJvZmlsZSIsIkdFVCIsInByb2ZpbGUiLCJmaW5kT25lIiwibGVhbiIsImpzb24iLCJzdWNjZXNzIiwiZGF0YSIsImhlcm9JbWFnZSIsImFib3V0SW1hZ2UiLCJlcnJvciIsImNvbnNvbGUiLCJmYWxsYmFjayIsIlBPU1QiLCJyZXEiLCJhZG1pblBhc3N3b3JkIiwicHJvY2VzcyIsImVudiIsIkFETUlOX1BBU1NXT1JEIiwiaGVhZGVycyIsImdldCIsInN0YXR1cyIsImJvZHkiLCJ1cGRhdGVGaWVsZHMiLCJ1cGRhdGVkQXQiLCJEYXRlIiwiZmluZE9uZUFuZFVwZGF0ZSIsIiRzZXQiLCJuZXciLCJ1cHNlcnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// lib/mongodb.ts\n\nconst MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';\nconst cached = global.mongoose ?? {\n    conn: null,\n    promise: null\n};\nif (!global.mongoose) {\n    global.mongoose = cached;\n}\nasync function connectDB() {\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQkFBaUI7QUFDZTtBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVcsSUFBSTtBQVkvQyxNQUFNRyxTQUF3QkMsT0FBT0wsUUFBUSxJQUFJO0lBQUVNLE1BQU07SUFBTUMsU0FBUztBQUFLO0FBRTdFLElBQUksQ0FBQ0YsT0FBT0wsUUFBUSxFQUFFO0lBQ3BCSyxPQUFPTCxRQUFRLEdBQUdJO0FBQ3BCO0FBRUEsZUFBZUk7SUFDYixJQUFJSixPQUFPRSxJQUFJLEVBQUUsT0FBT0YsT0FBT0UsSUFBSTtJQUNuQyxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQkgsT0FBT0csT0FBTyxHQUFHUCx1REFBZ0IsQ0FBQ0MsYUFBYTtZQUFFUyxnQkFBZ0I7UUFBTTtJQUN6RTtJQUNBTixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNsQyxPQUFPSCxPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbW9oaXRcXE9uZURyaXZlXFxEZXNrdG9wXFxQb3J0Zm9saW9cXHBvcnRmb2xpby1hcHBcXGxpYlxcbW9uZ29kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWIvbW9uZ29kYi50c1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSSB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9wb3J0Zm9saW8nO1xuXG5pbnRlcmZhY2UgTW9uZ29vc2VDYWNoZSB7XG4gIGNvbm46IHR5cGVvZiBtb25nb29zZSB8IG51bGw7XG4gIHByb21pc2U6IFByb21pc2U8dHlwZW9mIG1vbmdvb3NlPiB8IG51bGw7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxuICB2YXIgbW9uZ29vc2U6IE1vbmdvb3NlQ2FjaGUgfCB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IGNhY2hlZDogTW9uZ29vc2VDYWNoZSA9IGdsb2JhbC5tb25nb29zZSA/PyB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcblxuaWYgKCFnbG9iYWwubW9uZ29vc2UpIHtcbiAgZ2xvYmFsLm1vbmdvb3NlID0gY2FjaGVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHtcbiAgaWYgKGNhY2hlZC5jb25uKSByZXR1cm4gY2FjaGVkLmNvbm47XG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIHsgYnVmZmVyQ29tbWFuZHM6IGZhbHNlIH0pO1xuICB9XG4gIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gIHJldHVybiBjYWNoZWQuY29ubjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERCO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0REIiLCJjb25uZWN0IiwiYnVmZmVyQ29tbWFuZHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/Profile.ts":
/*!***************************!*\
  !*** ./models/Profile.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// models/Profile.ts\n\nconst ProfileSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    heroImage: {\n        type: String,\n        default: ''\n    },\n    aboutImage: {\n        type: String,\n        default: ''\n    },\n    updatedAt: {\n        type: Date,\n        default: Date.now\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Profile || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Profile', ProfileSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvUHJvZmlsZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvQkFBb0I7QUFDa0M7QUFRdEQsTUFBTUUsZ0JBQWdCLElBQUlELDRDQUFNQSxDQUFXO0lBQ3pDRSxXQUFXO1FBQUVDLE1BQU1DO1FBQVFDLFNBQVM7SUFBRztJQUN2Q0MsWUFBWTtRQUFFSCxNQUFNQztRQUFRQyxTQUFTO0lBQUc7SUFDeENFLFdBQVc7UUFBRUosTUFBTUs7UUFBTUgsU0FBU0csS0FBS0MsR0FBRztJQUFDO0FBQzdDO0FBRUEsaUVBQWVWLHdEQUFlLENBQUNZLE9BQU8sSUFDcENaLHFEQUFjLENBQVcsV0FBV0UsY0FBY0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxtb2hpdFxcT25lRHJpdmVcXERlc2t0b3BcXFBvcnRmb2xpb1xccG9ydGZvbGlvLWFwcFxcbW9kZWxzXFxQcm9maWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIG1vZGVscy9Qcm9maWxlLnRzXG5pbXBvcnQgbW9uZ29vc2UsIHsgRG9jdW1lbnQsIFNjaGVtYSB9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvZmlsZSBleHRlbmRzIERvY3VtZW50IHtcbiAgaGVyb0ltYWdlOiBzdHJpbmc7XG4gIGFib3V0SW1hZ2U6IHN0cmluZztcbiAgdXBkYXRlZEF0OiBEYXRlO1xufVxuXG5jb25zdCBQcm9maWxlU2NoZW1hID0gbmV3IFNjaGVtYTxJUHJvZmlsZT4oe1xuICBoZXJvSW1hZ2U6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICBhYm91dEltYWdlOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcbiAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLlByb2ZpbGUgfHxcbiAgbW9uZ29vc2UubW9kZWw8SVByb2ZpbGU+KCdQcm9maWxlJywgUHJvZmlsZVNjaGVtYSk7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTY2hlbWEiLCJQcm9maWxlU2NoZW1hIiwiaGVyb0ltYWdlIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJhYm91dEltYWdlIiwidXBkYXRlZEF0IiwiRGF0ZSIsIm5vdyIsIm1vZGVscyIsIlByb2ZpbGUiLCJtb2RlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/Profile.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.ts&appDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.ts&appDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_mohit_OneDrive_Desktop_Portfolio_portfolio_app_app_api_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/profile/route.ts */ \"(rsc)/./app/api/profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/profile/route\",\n        pathname: \"/api/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/profile/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\mohit\\\\OneDrive\\\\Desktop\\\\Portfolio\\\\portfolio-app\\\\app\\\\api\\\\profile\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_mohit_OneDrive_Desktop_Portfolio_portfolio_app_app_api_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9maWxlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9maWxlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNtb2hpdCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q1BvcnRmb2xpbyU1Q3BvcnRmb2xpby1hcHAlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q21vaGl0JTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDUG9ydGZvbGlvJTVDcG9ydGZvbGlvLWFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG1vaGl0XFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUG9ydGZvbGlvXFxcXHBvcnRmb2xpby1hcHBcXFxcYXBwXFxcXGFwaVxcXFxwcm9maWxlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wcm9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcHJvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcHJvZmlsZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG1vaGl0XFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUG9ydGZvbGlvXFxcXHBvcnRmb2xpby1hcHBcXFxcYXBwXFxcXGFwaVxcXFxwcm9maWxlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.ts&appDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprofile%2Froute&page=%2Fapi%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprofile%2Froute.ts&appDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cmohit%5COneDrive%5CDesktop%5CPortfolio%5Cportfolio-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();