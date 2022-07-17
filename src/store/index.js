import { configureStore, createSlice } from "@reduxjs/toolkit";

//以文件名为id，如果多次下载会覆盖
//上传
const uploadSlice = createSlice({
  name: "upload",
  initialState: [],
  reducers: {
    mutateUploadStatus: (state, action) => {
      state.value += action.payload;
    },
  },
});
//下载
const downloadSlice = createSlice({
  name: "download",
  initialState: [],
  reducers: {
    mutateDownloadStatus: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { mutateUpdateStatus } = uploadSlice.actions;
export const { mutateDownloadStatus } = downloadSlice.actions;
export default configureStore({
  reducer: { upload: uploadSlice.reducer, download: downloadSlice.reducer },
});
