import toast from "react-hot-toast";

export default function useExecutor<T>() {
  return async (executor: Promise<any>, text?: string) => {
    const _text = text ? text : "";
    let result: any;
    await toast.promise(executor, {
      loading: `${_text}加载中`,
      success: (data) => {
        result = data;
        return `${_text}成功😎`;
      },
      error: (error) => `${_text}失败😭 \n ${error}`,
    });
    return result as T;
  };
}
