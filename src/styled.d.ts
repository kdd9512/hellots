import 'styled-components';

// props. 사용할때 자동완성을 돕는다. DefaultTheme 에 style의 이름 입력.
declare module 'styled-components' {
    export interface DefaultTheme {
        blueColor: string;
    }
};