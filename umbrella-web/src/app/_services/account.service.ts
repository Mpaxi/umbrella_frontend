import { Injectable, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../_models/login.response';
import { ApiResponse } from '../_models/api.response';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/api/Authenticate/login`, { email, password })
            .pipe(
                map(response => {
                    // Salva os dados do usuario no localStorage do navegador para manter a sessão ativa mesmo após refresh da pagina
                    if (response.success) {
                        localStorage.setItem("access-token", response.data?.token!);
                        this.userSubject.next({ ...this.userSubject, token: response.data?.token })
                        this.getRole()
                        return true;
                    }
                    //this.userSubject.next(user);
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    //Caso a requisição retorne 401 ou qualquer outro erro, o retorno do login é false
                    return of(false);
                })
            );
    }

    saveToken(token: string, isAdmin: boolean) {
        this.userSubject.next({ ...this.userSubject, token: token, isAdmin: isAdmin })
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('access-token');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * @description Faz chamada da api para criar um novo usuario
     * @param user 
     * @returns retorna dados padrão da api (success; message; data)
     */
    register(user: User) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/register`, user).pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * @returns Retorna todos os usuario presentes no banco de dados
     */
    getAll() {
        return this.http.get<ApiResponse<User[]>>(`${environment.apiUrl}/getUsers`).pipe(
            map(res => {
                return res.data;
            })
        )
    }

    /**
     * @description busca chama a api para buscar usuario passado o id
     * @param id 
     * @returns retorna os dados do usuario que a api mandou
     */
    getById(id: string) {
        return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/getUser?ID=${id}`).pipe(
            map(res => {
                return res.data;
            })
        );
    }

    /**
     * @description realiza a chamada da api para atualização dos dados do usuário
     * @param params 
     * @returns dados padrão da api (success; message; data)
     */
    update(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/update`, params).pipe(
            map(res => res)
        )
    }

    /**
     * @description Setta o grupo em que o usuario pertence
     */
    getRole() {
        this.isAdmin().subscribe(
            res => {
                if (res) {
                    localStorage.setItem('isAdmin', "true");
                    this.userSubject.next({ ...this.userValue, isAdmin: true });
                }
            });

        this.isRestocker().subscribe(
            res => {
                if (res) {
                    localStorage.setItem('isAdmin', "false");
                    this.userSubject.next({ ...this.userValue, isAdmin: false });
                }
            }
        )
    }

    /**
     * @description Chama o endpoint "/api/home/admin"
     * @returns Retorna se o usuario logado é um admin
     */
    isAdmin() {
        return this.http.get<Response>(`${environment.apiUrl}/api/home/admin`)
            .pipe(
                map(response => {
                    if (response.status == 200 || response.status == 204) {
                        return true;
                    }
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    if (err.status == 200) {
                        return of(true);
                    }
                    return of(false);
                })
            );
    }

    /**
     * @description Chama o endpoint "/api/home/restockers"
     * @returns Retorna se o usuario logado é um estoquista
     */
    isRestocker() {
        return this.http.get<Response>(`${environment.apiUrl}/api/home/restockers`)
            .pipe(
                map(response => {
                    if (response.status == 200 || response.status == 204) {
                        return true;
                    }
                    return false;
                }),
                catchError((err, httpErrorResponse) => {
                    if (err.status == 200) {
                        return of(true);
                    }
                    return of(false);
                })
            );
    }

    activateUser(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/api/authenticate/active`, params).pipe(
            map(res => res)
        )
    }

    deactivateUser(params: any) {
        return this.http.post<ApiResponse<string>>(`${environment.apiUrl}/api/authenticate/deactive`, params).pipe(
            map(res => res)
        )
    }

    getUserData() {
        return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/getUserInfo`).pipe(
            map(res => res.data)
        )
    }
}
