import { renderHook } from "@testing-library/react";
import { act } from "react-test-renderer";
import useForm from "./hook";

const setup = (params) => {
    const { result } = renderHook(() => useForm(params))
    return result
}

test ('should change keyword', () => {
    const {result} = setup()
   
    act(() => {
        result.current.updateKeyword('paz')
    })
    
   
    expect(result.current.keyword).toBe('paz')
})


test ('should use initial values', () => {
    const result = setup({
        initialKeyword: 'perro'
    })
   
    expect(result.current.keyword).toBe('perro')
})

test ('should update correctly times when used twice', () => {
    const result = setup({
        initialKeyword: 'perro'
    })
    
    act(() => {
        result.current.updateKeyword('paz')
        result.current.updateKeyword('p')
    })
    expect(result.current.keyword).toBe('p')
    expect(result.current.times).toBe(2)
})