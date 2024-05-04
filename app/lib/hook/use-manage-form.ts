import { useCallback, useEffect, useState } from "react";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface options {
  prevData?: any;
  desc?: string;
  redirectUrl?: string;
}

export default function useManageForm(
  submitFunc: (data: any) => Promise<void>,
  options?: options,
) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (options?.prevData) {
      // console.log("form incoming prevData", options.prevData);
      form.setFieldsValue(options.prevData);
    }
  }, [options?.prevData]);

  const onSubmit = useCallback(
    async (newData: any) => {
      const redirectUrl = options?.redirectUrl || "/";

      try {
        setLoading(true);
        await submitFunc(newData);
        if (options?.prevData) {
          toast.success(`修改${options?.desc}成功`);
        } else {
          toast.success(`添加${options?.desc}成功`);
        }
        setLoading(false);
        router.push(redirectUrl);
      } catch (e) {
        setLoading(false);
        console.error("Error adding/editing book", e);
        toast.error(`出错了😭\n${e}`);
      }
    },
    [options?.prevData],
  );

  return {
    loading,
    onSubmit,
    form,
  };
}
