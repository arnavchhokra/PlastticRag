import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { CloudUpload, File, X  } from "lucide-react"
import { useRouter } from "next/navigation"
import { ApiResponse } from "@/types/facialtypes"
import { faceAtom, userAtom  } from "@/atom/atom"
import { useRecoilValue, useRecoilState } from "recoil"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/hooks/use-toast"


export default function FileUpload() {

  const { toast } = useToast()

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [, setResponseData] = useRecoilState(faceAtom);
  const [loading, setLoading] = useState(false);
  const token = useRecoilValue(userAtom);

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }
  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleUpload = async () => {
    if (!file) return
    if(!token){
      toast({
        title: "Please login first",
        description: "You need to login to use this feature",
        variant: "destructive",
      })
      router.push('/signin')
      return;
    }
    setLoading(true);
    const formData = new FormData()
    formData.append("file", file)
    try{
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: formData,
      })
      const data = await response.json()
      const cleanedMsg = data.msg.replace(/```json\n|```/g, '').replace(/"status:":/g, '"status":').trim();
      const parsedData: ApiResponse = JSON.parse(cleanedMsg);
      if(parsedData.status === 200) {
        setResponseData(parsedData)
        router.push("/result");
      }
      else{
        toast({
          title: "Please upload a better image",
          description: "The image you uploaded is not good enough",
          variant: "destructive",
        })
      }
    }

    catch(e){
      toast({
        title: "Please upload a better image",
        description: `${e}`,
        variant: "destructive",
      })
    }
  }


  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div
        className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          file ? "border-primary text-primary" : "border-muted-foreground hover:border-primary hover:text-primary"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (e.dataTransfer.files.length) {
            setFile(e.dataTransfer.files[0])
          }
        }}
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-2 text-center text-muted-foreground"
        >
          <CloudUpload className="h-8 w-8" />
          <p>
            Drag and drop a file here or <span className="font-medium text-primary">browse</span>
          </p>
        </label>
        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
      </div>
      {file && (
        <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium">{file.name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRemoveFile} className="rounded-full">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
      {
        loading?( <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>) : (<Button onClick={handleUpload} className="w-full">
          Submit
        </Button>)
      }

    </div>
  )
}