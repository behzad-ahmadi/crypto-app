import localFont from 'next/font/local'

export const IranYekan = localFont({
  src: [
    {
      path: './iranyekanwebthinfanum.woff',
      weight: '100',
      style: 'thin',
    },
    {
      path: './iranyekanweblightfanum.woff',
      weight: '300',
      style: 'light',
    },
    {
      path: './iranyekanwebregularfanum.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './iranyekanwebmediumfanum.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: './iranyekanwebboldfanum.woff',
      weight: '700',
      style: 'bold',
    },

    // TODO Remove unnecessary fonts
    {
      path: './iranyekanwebextraboldfanum.woff',
      weight: '800',
      style: 'extra-bold',
    },
    {
      path: './iranyekanwebblackfanum.woff',
      weight: '900',
      style: 'black',
    },
    {
      path: './iranyekanwebextrablackfanum.woff',
      weight: '950',
      style: 'extra-black',
    },
  ],
})
