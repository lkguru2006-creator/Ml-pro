import flet as ft

def main(page: ft.Page):
    page.add(ft.Text("Flet is working!", size=50, color="red"))
    page.update()

if __name__ == "__main__":
    ft.app(target=main)
