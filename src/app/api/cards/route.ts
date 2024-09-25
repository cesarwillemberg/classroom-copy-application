import { NextResponse } from "next/server"
import mysql from "mysql2/promise"

interface ClassData {
    nameClass: string;
    group: string;
    professorName: string;
    deadline: string;
    activityDetails: string;
}


export async function GET() {

    try {
        const connection = await mysql.createConnection("mysql://netjs:nextjs@localhost:3306/classroom_copy");
        const [rows] = await connection.query("SELECT * FROM turmas;");
        await connection.end();
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }

}


export async function POST(request: Request) {
    const body:ClassData = await request.json()


    const requiredFields: (keyof ClassData)[] = ['nameClass', 'group', 'professorName'];
    for (const field of requiredFields) {
        if (!body[field]) {
            return NextResponse.json({ error: `${field} é obrigatório.`, created: false });
        }
    }

    let connection: mysql.Connection | null = null;

    try {
        connection = await mysql.createConnection("mysql://netjs:nextjs@localhost:3306/classroom_copy")
        console.log("Conexão com o banco de dados estabelecida.");

        const [result] = await connection.query(
            "INSERT INTO turmas ( nameClass, grupo, professorName ) VALUES (?, ?, ?)", 
            [body.nameClass, body.group, body.professorName]
        );

        console.log("Dados inseridos com sucesso:", result);
        return NextResponse.json({ created: true });
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro desconhecido', created: false });
    } finally {
        if (connection) {
            await connection.end();
            console.log("Conexão com o banco de dados encerrada.");
        }
    }
}