import { Button, useToast } from "@chakra-ui/react"

function PromiseBasedToast({promise}:{promise:Promise<unknown>}) {
  const toast = useToast()
  return (
    <Button
      onClick={() => {
        // Create an example promise that resolves in 5s
        // const promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve(200), 5000)
        // })

        // Will display the loading toast until the promise is either resolved
        // or rejected.
        toast.promise(promise, {
         
          success: { title: 'Promise resolved', description: 'Looks great' , position:"top-right",},
          error: { title: 'Promise rejected', description: 'Something wrong', position:"top-right", },
          loading: { title: 'Promise pending', description: 'Please wait', position:"top-right", },
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default PromiseBasedToast