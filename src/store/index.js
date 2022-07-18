import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { convertToPercent, getNowStr } from "@/util";
import filesize from "filesize";
//上传
const listSlice = createSlice({
  name: "upload",
  initialState: {
    download: [
      {
        name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共3个文件))",
        size: "735.7MB",
        status: "2022/07/15 05:45 已完成",
      },
      {
        name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共222个文件))",
        size: "735.7MB",
        status: "2022/07/15 05:45 已完成",
      },
    ],
    upload: [
      {
        name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共3个文件))",
        size: "735.7MB",
        status: "2022/07/15 05:45 已完成",
      },
      {
        name: "Mr.Turner.2014.iNTERNAL.720p.BluRay (共222个文件))",
        size: "735.7MB",
        status: "2022/07/15 05:45 已完成",
      },
    ],
  },
  reducers: {
    mutateStatus: (state, action) => {
      console.log(state);
      const cur = state[action.payload.type];
      const item = action.payload.item;
      let index = cur.findIndex((i) => i.name === item.name);

      //以文件名为id，如果多次操作同一对象，则修改当前记录

      const formatedItem = {
        ...item,
        status:
          item.progress < 100
            ? convertToPercent(item.progress)
            : getNowStr() + " 已完成",
      };
      if (index > -1) {
        cur[index] = formatedItem;
      } else {
        //如果之前没有，说明是刚加的
        cur.push(formatedItem);
      }
    },
  },
});

const { mutateStatus } = listSlice.actions;

export const useGetList = (type) => {
  return useSelector((state) => state.list[type]);
};

export const useUpdateList = (type) => {
  const dispatch = useDispatch();
  return ({ name, size }) => {
    return (progress) => {
      dispatch(
        mutateStatus({
          type,
          item: {
            name,
            size: filesize(size),
            progress,
          },
        })
      );
    };
  };
};

export default configureStore({
  reducer: { list: listSlice.reducer },
});
